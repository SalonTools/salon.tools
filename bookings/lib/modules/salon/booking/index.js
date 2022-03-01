const {fields: {booleanField, help, required, searchable, schemaField, textarea}} = require('@salon/cms-utils');

module.exports = {
   extend: 'apostrophe-pieces',

   name: 'booking',
   slugPrefix: 'booking-',

   addColumns: [],
   defaultRemoveColumns: [],
   addFilters: [],
   addFields: [
      schemaField('title', 'Ref'),
      schemaField('_bookingType', 'Booking Type', required, {
         type: 'joinByOne',
         withType: 'bookingType',
         idField: 'bookingType',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            }
         },
      }),
      schemaField('_client', 'Client', required, {
         type: 'joinByOne',
         withType: 'client',
         filters: {
            projection: {
               _url: 1,
               title: 1,
               displayName: 1,
            }
         },
      }),
      schemaField('_services', 'Service', required, {
         type: 'joinByArray',
         withType: 'service',
         idsField: 'serviceIds',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            }
         },
      }),
      schemaField('_employee', 'Employee', required, {
         type: 'joinByOne',
         withType: 'employee',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            }
         },
      }),
      schemaField('status', 'Status', required),
      schemaField('notes', 'Notes'),
      schemaField('bookingDate', 'Booking Date', required, {type: 'date'}),
      schemaField('bookingTime', 'Booking Time', required, {type: 'time'}),
   ],
   overrideOptions: {
      fixed: {},
   },
   arrangeFields: [],
   construct (self, options) {
      const {createRoutes, insertResponse, newInstance} = self;

      self.newInstance = () => {
         return {
            ...newInstance(),
            status: 'BOOKED',
            slug: ''
         };
      };

      self.createRoutes = () => {
         createRoutes();
         self.route('post', 'create-booking', self.requireEditor, (req, res) => {
            debugger;
         });
      };

      /**
       * After creating a booking, adds time in the diary
       */
      self.afterInsert = async (req, piece, opt, callback) => {
         const {calendar} = self.apos.modules;

         await calendar.createFromBooking(req, piece);

         callback();
      };

      /**
       * Before creating a booking, check that the allocated employee can do the service
       */
      self.beforeInsert = async (req, piece, opt, callback) => {
         const {employee, service} = self.apos.modules;

         const [e, s] = await Promise.all([
            employee.find(req, {_id: piece.employeeId}).toObject(),
            service.find(req, {_id: { $in: piece.serviceIds } }).toArray(),
         ]);

         if (!s.every(({levelsIds}) => e._levels.some(({_id}) => levelsIds.includes(_id)))) {
            return callback(new Error(`Unable to book ${ s.title } with ${ e.title } - not a supported level`));
         }

         return callback();
      };

      /**
       * TODO: on saving a booking, cache the value of the booking
       */
      self.beforeSave = (req, piece, opt, callback) => {
         // TODO: create an audit entry for the date / time of the blocks
         // TODO:

         return callback();
      };
   }
};
