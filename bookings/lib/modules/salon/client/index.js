const {fields: {booleanField, help, required, searchable, schemaField, textarea}} = require('@salon/cms-utils');

module.exports = {
   extend: 'apostrophe-pieces',

   name: 'client',
   slugPrefix: 'client-',

   addColumns: [
      {
         name: 'firstName',
         label: 'First Name',
         sort: {
            firstName: 1,
         },
      },
      {
         name: 'lastName',
         label: 'Last Name',
         sort: {
            lastName: 1,
         }
      },
      {
         name: 'mobile',
         label: 'Mobile',
         sort: {
            mobile: 1,
         },
      },
   ],
   defaultRemoveColumns: [ 'title', 'published' ],
   addFilters: [
   ],
   addFields: [
      schemaField('title', 'Ref', {contextual: true}),
      schemaField('slug', 'Slug', {contextual: true}),
      schemaField('firstName', 'First Name', required),
      schemaField('lastName', 'Last Name', required),
      schemaField('mobile', 'Mobile'),
      schemaField('email', 'Email', {type: 'email'}),
      schemaField('notes', 'Notes'),
   ],
   overrideOptions: {
      fixed: {},
   },
   arrangeFields: [],
   construct (self, options) {
      const {beforeSave, newInstance} = self;

      self.newInstance = (...args) => {
         const title = self.apos.utils.generateId();

         return {
            ...newInstance(...args),
            title,
            slug: self.apos.utils.slugify(`${options.slugPrefix}${title}`),
         };
      };

      self.beforeSave = (req, piece, opt, callback) => {
         piece.published = piece.published !== false;
         piece.title = `${piece.firstName} ${piece.lastName}`;

         return beforeSave(req, piece, opt, callback);
      };
   }
};
