
module.exports = {

   deleteFromTrash: true,

   types: [
      {
         name: 'general',
         label: 'General'
      },
      {
         name: 'cms-redirect',
         label: 'Redirect'
      },
   ],

   park: [
      {
         title: 'Search',
         slug: '/search',
         type: 'apostrophe-search',
         label: 'Search',
         published: true
      }
   ]
};
