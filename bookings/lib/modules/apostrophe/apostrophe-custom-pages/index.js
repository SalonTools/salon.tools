module.exports = {
   construct (self, options) {
      self.getWidgetsForPage = () => self.apos.shared.getWidgets();

      self.addHelpers({
         getWidgets () {
            return self.getWidgetsForPage();
         },
         widgetOptions (field, overrides = {}) {
            return self.apos.shared.widgetOptions(field, overrides);
         },
      });
   }
}
