
module.exports = {

   construct (self, options) {
      self.addFilter('name', nameFilter(self, 'name'));
   }

};

function nameFilter (self, key) {
   return {
      def: null,
      safeFor: 'public',
      finalize () {
         const value = self.get(key);

         if (value === null) {
            return;
         }

         const and = {
            title: {
               $regex: value.replace(/\s+/, '\\S*\\s+'),
               $options: 'i',
            }
         };
         self.and(and);
      },
      launder (s) {
         return self.apos.launder.string(s);
      },
   }
}
