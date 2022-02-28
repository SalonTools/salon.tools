module.exports = {

   extend: 'apostrophe-custom-pages',

   name: 'cms-redirect',

   arrangeFields: [
      { name: 'settings', label: 'Settings', fields: ['redirectUrl']}
   ],

   addFields: [

      {
         type: 'string',
         name: 'redirectUrl',
         label: 'Redirect Url',
         required: true,
      },

   ],

   construct (self, options) {
      const {acceptResponsibility} = self;

      self.acceptResponsibility = (req) => {
         if (!self.apos.permissions.can(req, 'edit')) {
            return req.redirect = req.data.page.redirectUrl || '/';
         }

         return acceptResponsibility(req);
      };
   },
};

