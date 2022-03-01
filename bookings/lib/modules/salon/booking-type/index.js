const {fields: {booleanField, help, required, searchable, schemaField, textarea}} = require('@salon/cms-utils');

module.exports = {
   extend: 'apostrophe-pieces',

   name: 'bookingType',
   slugPrefix: 'booking-type-',

   addColumns: [],
   defaultRemoveColumns: [],
   addFilters: [],
   addFields: [
      schemaField('title', 'Code', required),
      schemaField('label', 'Label', required),
   ],
   overrideOptions: {
      fixed: {},
   },
   arrangeFields: [],
   construct (self, options) {
   }
};
