
const ALWAYS = 'always';
const USER = 'user';

module.exports = {

   jQuery: 3,

   stylesheets: [
      { name: 'site', when: ALWAYS },
      { name: 'admin', when: USER },
   ],

   scripts: [
      { name: 'menu', when: ALWAYS },
      { name: 'analytics', when: ALWAYS },
      { name: 'editor-helper', when: USER },
   ],

   construct (self, options) {
      if (self.apos.launder.boolean(process.env.GF_ANALYTICS_ENABLED)) {
         self.apos.push.browserCall('always', 'app.track(?)', process.env.GF_ANALYTICS_ACCOUNT);
      }
   }

};
