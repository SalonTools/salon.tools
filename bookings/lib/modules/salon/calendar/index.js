const {fields: {booleanField, help, required, searchable, schemaField, textarea}} = require('@salon/cms-utils');


module.exports = {
   extend: 'apostrophe-pieces',
   name: 'calendar',
   slugPrefix: 'calendar-',
   addColumns: [],
   defaultRemoveColumns: [],
   addFilters: [],
   addFields: [
      schemaField('date', 'Date', { type: 'date' }),
      schemaField('start', 'Start', { type: 'time' }),
      schemaField('end', 'End', { type: 'time' }),
      schemaField('_client', 'Client', {
         type: 'joinByOne',
         withType: 'client',
         idField: 'clientId',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            },
         },
      }),
      schemaField('_employee', 'Employee', {
         type: 'joinByOne',
         withType: 'employee',
         idField: 'employeeId',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            },
         },
      }),
      schemaField('_service', 'Service', {
         type: 'joinByOne',
         withType: 'service',
         idField: 'serviceId',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            },
         },
      }),
      schemaField('_booking', 'Booking', {
         type: 'joinByOne',
         withType: 'booking',
         idField: 'bookingId',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            },
         },
      }),
   ],
   construct (self, options) {
      require('./lib/create-from-booking')(self, options);
   }
}
