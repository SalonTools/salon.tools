(function () {

   jQuery('gf-carousel').each(function (i, c) {
      const $c = $(c);

      const urls = Array.from($c.find('gf-carousel-image[url]'), carouselImageUrl);
      const $parent = $c.closest('.image-container');
      const $tile = $parent.find('.image-container')
         .css('background-image', $parent.css('background-image'))
         .clone();

      tick(2500);

      function carousel () {
         const next = urls.pop();
         const tile = $tile.clone()
            .css('transform', 'translateX(100%)')
            .css('background-image', 'url("' + next + '")');

         $parent.find('.carousel-prev').remove();
         const prev = $parent.find('.image-container').addClass('carousel-prev');
         $parent.append(tile);

         setTimeout(function () {
            prev.css('transform', 'translateX(-100%)')
            tile.css('transform', 'translateX(0%)')
         }, 25);

         urls.unshift(next);

         tick();
      }

      function carouselImageUrl(node) {
         return preloadImage(node.getAttribute('url'));
      }

      function preloadImage (url) {
         return (new Image().src = url);
      }

      function tick (timeout) {
         setTimeout(carousel, timeout || 5000);
      }
   });

}());
