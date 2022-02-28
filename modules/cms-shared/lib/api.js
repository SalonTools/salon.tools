const {assign, find, kebabCase, matchesProperty} = require('lodash');

module.exports = function sharedApi (self) {

   return {

      widgetOptions (field, overrides = {}) {
         const data = self.apos.templates.contextReq.data || {};
         const doc = data.piece || data.page;

         const fields = doc && self.apos.docs.getManager(doc.type)?.schema || [];
         const schema = String(field).split('.').reduce((all, name) => {
            return find(all.schema || all, ['name', name]) || [];
         }, fields) || {};

         return assign({}, schema.options, overrides);
      },

      augmentSchemaSharedWidgets (schema, ...names) {

         names.forEach(name => {

            const allWidgets = self.getWidgets();
            const field = findFieldFromSchema(schema, name.split('.'));

            if (!field) {
               throw new Error(`Cannot augment schema for field '${ name }', filter not found in schema`);
            }

            if (field.type === 'area') {

               field.options = {
                  ...(field.options || {}),
                  widgets: allWidgets,
               };

               return;
            }

            if (field.type === 'singleton' && allWidgets[field.widgetType]) {

               field.options = {
                  ...(field.options || {}),
                  ...allWidgets[field.widgetType],
               };

               return;
            }

            throw new Error(`Cannot augment schema for '${ field.name }', type must be 'area' or 'singleton' but is '${ field.type }'`);

         });

      },

      appendChoices (schema, path, options) {
         const field = findFieldFromSchema(schema, path.split('.'));
         if (field) {

            if (!field.choices && !field.required) {
               field.choices = [{label: '', value: ''}];
            }

            field.choices = [
               ...(field.choices || []),
               ...options.map(asOption),
            ];
         }

         return field;
      }

   };

   function findFieldFromSchema (schema, names) {
      if (!schema) {
         return;
      }

      const field = schema.find(matchesProperty('name', names.shift()));
      if (!field) {
         return;
      }

      return names.length ? findFieldFromSchema(field.schema, names) : field;
   }

   function asOption (label) {
      if (typeof label === 'string') {
         return {
            label,
            value: kebabCase(label),
         };
      }

      return label;
   }
};
