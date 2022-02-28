module.exports = {
   sanitizeHtml: {
      allowedClasses: {
         'p': ['outlined-area', 'regular-text', 'small-text'],
         'h2': ['heading-text', 'ta-center'],
         'h3': ['outlined-text', 'ta-center'],
         'section': ['boxed', 'ta-center']
      },
      allowedAttributes: {
         '*': ['style', 'href', 'target', 'class']
      },
      allowedTags: [
         'h2', 'h3', 'h4',
         'p', 'a', 'blockquote', 'section',
         'ul', 'ol', 'li',
         'b', 'i', 'em', 'code', 'hr', 'br', 'pre', 'div',
         'section',
         'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td'
      ],
   }
};
