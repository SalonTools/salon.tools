const {fields: {booleanField, help, required, searchable, schemaField, textarea}} = require('@salon/cms-utils');

module.exports = {

   addFields: [
      schemaField('siteName', 'Site Name', required()),
      {
         name: 'contact',
         type: 'object',
         schema: [
            schemaField('phone', 'Phone Number'),
            schemaField('mobile', 'Mobile Phone Number'),
            schemaField('email', 'Email Address'),
            schemaField('map', 'Google Maps URL'),
            schemaField('review', 'Google Review URL'),
         ],
      },

      schemaField('recaptchaSite', 'reCAPTCHA Site', help('See https://www.google.com/u/1/recaptcha/admin/ for site and secret details')),
      schemaField('recaptchaSecret', 'reCAPTCHA Secret'),
      schemaField('cookieConsent', 'Cookie Consent'),

      {
         name: 'trailingHead',
         type: 'array',
         titleField: 'name',
         schema: [
            schemaField('name', 'Name', required()),
            booleanField('enabled', 'Enabled'),
            schemaField('content', 'Content', required(), textarea(), searchable(false)),
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
