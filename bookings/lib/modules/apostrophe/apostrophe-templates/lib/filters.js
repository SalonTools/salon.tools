const _ = require('lodash');
const queryString = require('querystring');


const OG_TYPES = new Map([
   ['blog', 'article'],
   ['talent', 'profile']
]);
const OG_TYPE_DEFAULT = 'website';

module.exports = function filters (self) {

   self.addFilter('bounds', (source, path) => {
      if (Array.isArray(source)) {
         return bounds(source);
      }

      if (_.isPlainObject(source)) {
         return bounds(_.map(source, path || _.identity));
      }

      return bounds([0, 0]);
   });

   self.addFilter('sortBy', (source, path) => {
      return _.sortBy(source, path);
   });

   self.addFilter('maxBy', (source, path) => {
      return _.maxBy(source, path || _.identity);
   });

   self.addFilter('minBy', (source, path) => {
      return _.minBy(source, path || _.identity);
   });

   self.addFilter('difference', (source, ...strings) => {
      return _.difference(source, _.flatten(strings));
   });

   /**
    * `og_type` filter used to convert a module type to its associated open graph page type, eg: `blog` is an
    * `article` and `talent` is a `profile` page.
    */
   self.addFilter('og_type', (thing) => {
      return OG_TYPES.get(thing) || OG_TYPE_DEFAULT;
   });

   /**
    * `qs` filter used to build URLs with query string parameters appended
    */
   self.addFilter('qs', (baseUrl, ...params) => {
      let key = null;
      let hasQuery = baseUrl.includes('?');
      let baseQuery = hasQuery ? queryString.parse(baseUrl.substr(baseUrl.indexOf('?') + 1)) : {};
      let nextQuery = params.reduce((all, current, index) => {
         if (typeof current === 'object' && current) {
            all = Object.assign(all, current);
         }
         else if (key) {
            all[key] = current;
            key = null;
         }
         else {
            key = current;
         }

         return all;
      }, {});

      let query = queryString.stringify(_.pickBy(Object.assign({}, baseQuery, nextQuery)));
      let base = baseUrl.replace(/\?.+$/, '');

      return `${ base }${ query ? '?' : '' }${ query }`;

   });

   self.addFilter('divisibleBy', (source, ...divisions) => {
      if (!divisions.length) {
         divisions.push(6);
      }

      for (let i = 0; i < divisions.length; i++) {
         if (!(source.length % divisions[i])) {
            return divisions[i];
         }
      }

      return divisions[0];
   });

   self.addFilter('keys', (source) => {
      return (source && typeof source === 'object') ? Object.keys(source) : `Not an object: ${ JSON.stringify(source) }`;
   });

   self.addFilter('sort', (things, prop) => {
      if (!Array.isArray(things)) {
         return things;
      }

      return _.sortBy(things, prop ? _.property(prop) : _.identity);
   });

   self.addFilter('prop', (thing, prop) => {
      return _.isObjectLike(thing) ? _.get(thing, prop) : thing;
   });

   self.addFilter('focalPoint', (relationship) => {
      if (!self.apos.attachments.hasFocalPoint(relationship)) {
         return '';
      }

      return `; background-position: ${ self.apos.attachments.focalPointToBackgroundPosition(relationship) }`;
   });

   self.addFilter('max', (things, length = 1) => {
      if (things === undefined || things === null) {
         return [];
      }
      return [].concat(things).slice(0, length);
   });

   self.addFilter('count', (thing) => {
      const notNullObject = thing && 'object' === typeof thing;

      if (Array.isArray(thing) || typeof thing === 'string') {
         return thing.length;
      }

      if (notNullObject) {
         return 'length' in thing ? thing.length : Object.keys(thing).length;
      }

      return thing ? 1 : 0;
   });

   self.addFilter('slug', (thing, property) => {
      return (_.kebabCase(typeof property === 'string' ? _.get(thing, property) : thing) || '').toLowerCase();
   });

   self.addFilter('startCase', (thing, property) => {
      return _.startCase(typeof property === 'string' ? _.get(thing, property) : thing);
   });

   /**
    * Determines if the supplied value (or key of that value) is empty (constituting something not a false-like value or
    * empty array, object, set or map)
    */
   self.addFilter('empty', (thing, property) => {
      const value = typeof property === 'string' ? _.get(thing, property) : thing;

      if (value === true) {
         return false;
      }

      return _.isEmpty(value);
   });

   /**
    * Removes all white-space from the input content
    */
   self.addFilter('noWhiteSpace', (thing) => {
      return String(thing).replace(/\s/g, '');
   });
};

function bounds (values) {
   const numbers = values.filter(Boolean);

   return {
      min: _.min(numbers),
      max: _.max(numbers),
   };
}
