
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
      {
         name: 'client-page',
         label: 'Client',
      }
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
