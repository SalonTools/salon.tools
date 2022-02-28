module.exports = {

   filters: [

      { label: 'Blog Posts', name: 'hot-blog' },

   ],

   types: [
      'blog',
      'artist'
   ],

   construct (self, options) {

      const {beforeIndex} = self;

      self.beforeIndex = (req, ...args) => {

         if (req.data.autoSelect && req.data.totalDocs === 1 && !self.apos.utils.isAjaxRequest(req)) {
            req.redirect = req.data.docs[0]._url;
         }

         beforeIndex(req, ...args);
      };

      self.addHelpers({
         isWrappedPage (page) {
            return !page || page.type !== self.name;
         }
      });
   }

};
