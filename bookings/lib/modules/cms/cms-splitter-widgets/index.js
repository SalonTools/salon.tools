module.exports = {

   extend: 'apostrophe-widgets',

   label: 'Content Splitter',

   addFields: [

      {
         name: 'width',
         label: 'Width',
         type: 'select',
         choices: [
            {
               label: 'Normal',
               value: ''
            },
            {
               label: 'Wide',
               value: 'hr-wide'
            },
            {
               label: 'Full Width',
               value: 'hr-full-width'
            },
         ]
      },

      {
         name: 'theme',
         label: 'Theme',
         type: 'select',
         choices: [
            {
               label: 'Standard',
               value: '',
            },
            {
               label: 'Accent',
               value: 'hr-accent',
            },
         ]
      },

      {
         name: 'spaceAfter',
         label: 'Extra Spacing Below',
         type: 'select',
         choices: [
            {
               label: 'Standard',
               value: '',
            },
            {
               label: 'Wide',
               value: 'mb-2',
            },
            {
               label: 'Extra Wide',
               value: 'mb-4',
            },
         ]
      }

   ],

   arrangeFields: [
      {
         name: 'detail',
         label: 'Detail',
         fields: ['width', 'theme', 'spaceAfter'],
      }
   ],

   construct (self, options) {
      const {pushAsset, pushAssets} = self;

      self.pushAssets = (...args) => {
         pushAsset('stylesheet', 'always', {});
         return pushAssets(...args);
      };
   }
};
