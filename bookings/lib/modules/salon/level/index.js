const {fields: {booleanField, help, required, searchable, schemaField, textarea}} = require('@salon/cms-utils');

module.exports = {
   extend: 'apostrophe-pieces',

   name: 'level',
   slugPrefix: 'level-',

   addColumns: [],
   addFilters: [],
   addFields: [
      schemaField('title', 'Name', required),
   ],
   overrideOptions: {
      fixed: {},
   },
   arrangeFields: [],
};
