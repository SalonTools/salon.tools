module.exports = {

   alias: 'shared',

   construct (self, options) {

      addToSelf(require('./lib/helpers'), true);
      addToSelf(require('./lib/api'), false);

      function addToSelf (factory, asHelpers) {
         const things = factory(self, options);

         Object.assign(self, things);
         if (asHelpers) {
            self.addHelpers(things);
         }
      }

   }

};
