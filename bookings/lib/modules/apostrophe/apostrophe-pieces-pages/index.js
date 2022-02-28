const {map} = require('lodash');

module.exports = {

   pageRenderFields: [
      {
         name: 'indexPageLayout',
         type: 'select',
         label: 'Index Page Layout',
         def: 'general-page',
         choices: [
            { value: 'general-page', label: 'General Layout', showFields: ['showTitle'] },
            { value: 'home-page', label: 'Home Page Layout' },
         ]
      },
      {
         name: 'showTitle',
         type: 'boolean',
         label: 'Show title on index page',
         choices: [
            {value: true, showFields: ['pageTitle', 'pageSubTitle']},
         ],
      },
      {
         name: 'pageTitle',
         type: 'string',
         label: 'Page title (defaults to the title of the page)',
      },
      {
         name: 'pageSubTitle',
         type: 'string',
         label: 'Optional sub-title',
      },
      {
         name: 'showPieceTitle',
         type: 'boolean',
         label: 'Show title on piece page',
         choices: [
            {value: true, showFields: ['pieceTitleFormat']},
         ]
      },
      {
         name: 'pieceTitleFormat',
         type: 'select',
         label: 'Piece page title format',
         choices: [
            { value: 'piece', label: 'Piece title on its own' },
            { value: 'page-piece', label: 'Page title, piece sub-title' },
         ]
      },

   ],

   construct (self, options) {

      self.beforeIndex = (req, callback) => {

         const page = req.data.page;
         if (page) {
            page._bodyClass = page.indexPageLayout || 'general-page';
            page._asHomePage = page._bodyClass === 'home-page';
            page._withTitle = page._bodyClass === 'general-page' && page.showTitle;
         }

         setImmediate(callback)
      };

      if (options.addPageRenderFields) {
         options.addFields = [
            ...(options.addFields || []),
            ...options.pageRenderFields,
         ];

         options.arrangeFields = [
            ...(options.arrangeFields || []),
            {
               name: 'pageRender',
               label: 'Page Rendering',
               fields: map(options.pageRenderFields, 'name'),
            }
         ]
      }
   },

};
