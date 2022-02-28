(function () {

   var doc = jQuery(document.documentElement);
   var menuActiveClass = 'page-menu-active';

   doc.on('click', '.page-menu .menu-icon', onMenuToggled);

   function onMenuToggled () {
      doc.toggleClass(menuActiveClass);

      if (doc.hasClass(menuActiveClass)) {
         onMenuOpened();
      }
   }

   function onMenuOpened () {
      doc.prop('scrollTop', 0);
      doc.one('click.menu', onMenuClosed);
   }

   function onMenuClosed () {
      doc.removeClass(menuActiveClass).off('.menu');
   }

}());
