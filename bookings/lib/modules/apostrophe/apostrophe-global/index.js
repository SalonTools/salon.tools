module.exports = {

   addFields: [
      stringField('siteName', 'Site Name', required()),
      {
         name: 'contact',
         type: 'object',
         schema: [
            stringField('phone', 'Phone Number'),
            stringField('mobile', 'Mobile Phone Number'),
            stringField('email', 'Email Address'),
            stringField('map', 'Google Maps URL'),
            stringField('review', 'Google Review URL'),
         ],
      },

      stringField('recaptchaSite', 'reCAPTCHA Site', help('See https://www.google.com/u/1/recaptcha/admin/ for site and secret details')),
      stringField('recaptchaSecret', 'reCAPTCHA Secret'),
      stringField('cookieConsent', 'Cookie Consent'),

      {
         name: 'trailingHead',
         type: 'array',
         titleField: 'name',
         schema: [
            stringField('name', 'Name', required()),
            booleanField('enabled', 'Enabled'),
            stringField('content', 'Content', required(), textarea(), searchable(false)),
         ],
      },
   ],

   arrangeFields: [
      {
         name: 'contactFields',
         label: 'Contact',
         fields: ['contact'],
      },
      {
         name: 'recaptchaFields',
         label: 'reCAPTCHA',
         fields: ['recaptchaSite', 'recaptchaSecret'],
      },
      {
         name: 'plugins',
         label: 'Plugins',
         fields: ['trailingHead'],
      },
      {
         name: 'content',
         label: 'Content',
         fields: ['siteName', 'cookieConsent'],
      },

   ],
   overrideOptions: {
      editable: {
         'apos.apostrophe-forms.recaptchaSite': 'recaptchaSite',
         'apos.apostrophe-forms.recaptchaSecret': 'recaptchaSecret'
      }
   }
};

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

function stringField (name, label, ...modifiers) {
   return modifiers.reduce((field, modifier) => modifier(field), {
      type: 'string',
      name,
      label,
   });
}

function required (required = true) {
   return field => Object.assign(field, {required});
}

function textarea (textarea = true) {
   return field => Object.assign(field, {textarea});
}

function searchable (searchable = true) {
   return field => Object.assign(field, {searchable});
}

function help(help = '') {
   return field => Object.assign(field, {help});
}
