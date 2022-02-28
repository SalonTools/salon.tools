(function () {

   var disableClass = 'no-editor-helper';
   var html = document.documentElement;
   var body = document.body;

   function onHtmlClick (e) {
      if (html.classList.contains(disableClass)) {
         html.classList.remove(disableClass);
      }
   }

   function onBodyClick (e) {
      if (e.target && e.target.matches('.editor-helper')) {
         html.classList.add(disableClass);
      }
   }

   html.addEventListener('click', onHtmlClick, true);
   body.addEventListener('click', onBodyClick, true);

}());
