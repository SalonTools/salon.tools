module.exports = {

   extend: 'apostrophe-custom-pages',

   name: 'general',

   arrangeFields: [
      { name: 'settings', label: 'Settings', fields: ['pageLayoutType']}
   ],

   addFields: [

      {
         type: 'select',
         name: 'pageLayoutType',
         def: 'home-page',
         choices: [
            {
               value: '',
               label: 'Default (header shows logo)',
            },
            {
               value: 'page-header-text',
               label: 'Show page title as text',
            },
            {
               value: 'home-page',
               label: 'Home Page',
            },
            {
               value: 'home-page page-content-has-gap',
               label: 'Home Page - Vertical Padding',
            },
            {
               value: 'promo-page',
               label: 'Promo Page',
            },
         ]
      }

   ],

   afterConstruct (self) {
      self.dispatch('/', self.generalPage);
      self.dispatch('/latest', self.latestChildPage);
   },

   construct (self, options) {
      self.generalPage = (req, callback) => {
         req.template = self.renderer('general');
         setImmediate(callback);
      };

      self.latestChildPage = (req, callback) => {
         const latest = req.data.page._children.sort((a, b) => b.updatedAt - a.updatedAt);

         req.redirect = (latest.length && latest[0] || req.data.page)._url;

         setImmediate(callback);
      };
   }

};
