
module.exports = {

   openOnLoad: false,

   openOnHomepageLoad: false,

   addGroups: [
      {
         label: 'Administration',
         items: [
            // '@kwsites/cms-email',
            'apostrophe-files',
            'apostrophe-pages',
            'apostrophe-tags',
            'apostrophe-users',
            'apostrophe-groups',
            'apostrophe-global',
         ]
      },
      // {
      //    label: 'Contact',
      //    items: ['cms-contact-form', '@kwsites/cms-subscriber', 'gf-win-entry', 'apostrophe-forms'],
      // },
      {
         label: 'Content',
         items: ['apostrophe-images',
            // 'cms-blog', 'gf-insta'
         ],
      },
      // {
      //    label: 'Salon',
      //    items: ['gf-artist', 'gf-service', 'gf-price-list', 'gf-service-pricing'],
      // },
      {
         label: 'Salon',
         items: [
            'client',
            'employee',
            'level',
            'service',
         ],
      },
      {
         label: 'Booking',
         items: [
            'booking',
            'booking-type',
         ],
      },
   ],

   order: [
      'booking',
      'client',
      // 'cms-contact-form',
      // 'gf-artist',
      'apostrophe-images',
   ],

};
