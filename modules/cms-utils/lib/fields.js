module.exports = {
   arraySchema,
   booleanField,
   def,
   floatType,
   help,
   numericType,
   required,
   searchable,
   schemaField,
   textarea,
};

function arraySchema (...schema) {
   return field => Object.assign(field, {type: 'array', schema});
}

function booleanField (name, label, ...showFields) {
   const field = {
      type: 'boolean',
      def: false,
      name,
      label,
   };

   if (showFields.length) {
      field.choices = [
         {
            value: true,
            showFields,
         },
      ];
   }

   return field;
}

function def(def) {
   return undefined === def ? {} : { def };
}

function floatType (min = 0) {
   return numericType(min, 'float');
}

function help (help = '') {
   return field => Object.assign(field, {help});
}

function numericType (min = 0, type = 'integer') {
   if (typeof min === 'number') {
      return field => Object.assign(field, {type, min});
   }

   return Object.assign(field, {type});
}

function required (required = true) {
   if (typeof required === "boolean") {
      return field => Object.assign(field, {required});
   }
   return Object.assign(required, {required: true});
}

function schemaField (name, label, ...modifiers) {
   return modifiers.reduce((field, modifier) => typeof modifier === 'function' ? modifier(field) : Object.assign(field, modifier), {
      type: 'string',
      name,
      label,
   });
}

function searchable (searchable = true) {
   return field => Object.assign(field, {searchable});
}

function textarea (textarea = true) {
   return field => Object.assign(field, {textarea});
}
