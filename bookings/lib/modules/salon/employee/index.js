const {fields: {booleanField, help, required, searchable, schemaField, textarea}} = require('@salon/cms-utils');

module.exports = {
   extend: 'apostrophe-pieces',

   name: 'employee',
   slugPrefix: 'employee-',

   addColumns: [],
   addFilters: [],
   addFields: [
      schemaField('title', 'Name', required),
      {
         name: '_levels',
         type: 'joinByArray',
         withType: 'level',
         filters: {
            projection: {
               _url: 1,
               title: 1,
            }
         }
      },
   ],
   overrideOptions: {
      fixed: {},
   },
   arrangeFields: [],
};
