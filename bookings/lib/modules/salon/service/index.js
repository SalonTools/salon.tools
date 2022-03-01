const {fields: {arraySchema, floatType, numericType, required, def, schemaField, textarea}} = require('@salon/cms-utils');

module.exports = {
   extend: 'apostrophe-pieces',

   name: 'service',
   slugPrefix: 'service-',

   addColumns: [],
   addFilters: [],
   addFields: [
      schemaField('title', 'Name', required),
      schemaField('segments', 'Segments', { listItemTemplate: 'service:segments-list-template.html' } , arraySchema(
         schemaField('name', 'Name'),
         schemaField('duration', 'Duration', required, numericType(), def(0)),
         schemaField('gap', 'Gap', required, numericType(), def(0)),
      )),
      {
         name: '_levels',
         type: 'joinByArray',
         withType: 'level',
         idsField: 'levelsIds',
         relationshipsField: 'levelsRelationship',
         relationship: [
            schemaField('price', 'Price', floatType(), {inline: true}),
            // TODO: also allow overriding the `segments` on a per-level basis
         ],
         filters: {
            projection: {
               _url: 1,
               title: 1,
            }
         }
      }
   ],
   overrideOptions: {
      fixed: {},
   },
   arrangeFields: [],

   construct (self, options) {
      self.on('apostrophe-docs:beforeSave', 'onGlobalDocsSaved', (req, doc, opt) => {
         if (options.name !== doc.type) {
            return;
         }

         // when saving a service, we know which levels (and therefore employees) can do
         // this service and how much they charge for it.
      });
   }
};
