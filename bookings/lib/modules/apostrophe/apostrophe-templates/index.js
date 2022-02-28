
const DISALLOWED_KEYWORDS = new Set(require('./disallowed-keywords.json'));
const REQUIRED_KEYWORDS = require('./required-keywords.json');
const MINIMUM_KEYWORD_LENGTH = 4;

module.exports = {

   construct (self, options) {

      self.addFilter('keywords', (content, count = 10) => {

         const required = options.defaultKeywords || REQUIRED_KEYWORDS;
         const defaultKeywords = Object.keys(required).reduce((all, word) => {
            all[word] = all[all.length] = {
               count: required[word],
               word
            };
            return all;
         }, []);

         return content
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter(word => word.length >= MINIMUM_KEYWORD_LENGTH)
            .reduce((map, word) => {
               let keyWord = word.replace(/\s$/, '');
               if (keyWord.length < MINIMUM_KEYWORD_LENGTH) {
                  return map;
               }

               const key = `key-${ keyWord }`;

               if (!map[key]) {
                  map[key] = map[map.length] = {
                     count: 0,
                     word: word
                  };
               }
               map[key].count += 1;

               return map;
            }, defaultKeywords)
            .filter(item => item.count > 1 && !/^[0-9]+$/.test(item.word) && !DISALLOWED_KEYWORDS.has(item.word))
            .sort((a, b) => b.count - a.count)
            .slice(0, count)
            .map(item => item.word)
            .join(', ');
      });


      require('./lib/filters')(self);
      require('./lib/helpers')(self);
   }

};
