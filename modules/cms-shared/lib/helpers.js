const {format} = require('date-fns');

module.exports = function sharedHelpers (self, options) {

   const {widgets} = options;

   return {

      getWidgets () {
         return widgets;
      },

      readableTime (date) {
         return format(date, `HH:mm`);
      },

      readableDate (date) {
         return format(date, `dd-MMM-yyyy`);
      },

      uploadPath (path) {
         return self.apos.attachments.uploadfs.getUrl() + path;
      },

      utcTimestamp (date) {
         return format(date, `yyyy-MM-dd'T'HH:mm:ss.SSSxxx`)
      },
   };

};
