const widgets = require('./widgets');

require('apostrophe')({

   nestedModuleSubdirs: true,
   shortName: 'salon_tools',

   modules: {
      '@salon/shared': {
         widgets: {
            ...widgets.standard,
            '@kwsites/cms-layout': {},
         },
      },

      'general-pages': {},

      '@kwsites/cms-common': {},
      '@kwsites/cms-layout-widgets': {
         widgets: widgets.standard,
      },
      '@kwsites/cms-seo': {},

      'apostrophe-headless': {},
   },

});
