module.exports = function (self) {

   self.addHelpers({
      ogBreadcrumb: ogBreadcrumbList,
      ampSocialMedia,
   });

   function ogImage (image) {
      const url = image && self.apos.attachments.url(image);
      if (!url) {
         return null;
      }

      return {
         '@type': 'ImageObject',
         url: url,
         height: image.height,
         width: image.width
      };
   }

   function ogBreadcrumbItem (position, url, name, image) {
      return {
         '@type': 'ListItem',
         'position': position,
         'item': {
            '@id': url,
            'name': name,
            'image': ogImage(image)
         }
      };
   }

   function ogBreadcrumbList () {
      const data = {
         '@context': 'http://schema.org',
         '@type': 'BreadcrumbList',
         'itemListElement': [],

         $item: (url, name, image) => {
            data.itemListElement.push(ogBreadcrumbItem(data.itemListElement.length + 1, url, name, image));
            return data;
         },

         $json: () => self.safe(JSON.stringify(data))
      };

      return data;
   }

   function ampSocialMedia (url) {
      const data = {
         '@context': 'http://schema.org',
         '@type': 'Organization',
         'url': url,
         'sameAs': [],

         $sameAs (url) {
            data.sameAs.push(url);
            return data;
         },

         $json () {
            return self.safe(JSON.stringify(data));
         }
      };

      return data;
   }

};
