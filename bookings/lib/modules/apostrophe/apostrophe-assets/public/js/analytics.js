(function (app, apos, jQuery, _) {

   'use strict';

   var addTrack = (function () {
      var tracks = [];

      apos.on('cookie.consent', function () {
         tracks.forEach((function (args) { gtag.apply(null, args)}));
         addTrack = gtag;
      });

      return function () {
         tracks.push([].slice.call(arguments));
      };
   }());


   /**
    * For the complete list of "recommended" events and the parameters that can go with them, see:
    * https://developers.google.com/analytics/devguides/collection/gtagjs/events#recommended-events
    *
    */

   app.track = function (account) {
      addTrack('js', new Date());
      addTrack('config', account);
   };

   app.track.event = function event (eventName, eventParams) {
      addTrack('event', eventName, eventParams);
   };

   apos.on('app.track', function (e) {
      app.track.event(e.name, e.params);
   });

   jQuery(document).on('click', '[data-track-event]', function (e) {
      var d = jQuery(e.target).data();
      var keys = _.filter(_.keys(d), function (key) { return /^track/.test(key) && key !== 'trackEvent'; });

      var eventName = d.trackEvent;
      var eventParams = _.reduce(keys, function (eventParams, key) {
         eventParams[_.snakeCase(key.replace(/^track/, ''))] = d[key];
         return eventParams;
      }, {});

      app.track.event(eventName, eventParams);
   });

   if (!apos.user) {
      jQuery(window).on('error', function (e) {
         app.track.event('exception', {
            description: e.originalEvent.message,
            fatal: true
         });
      });
   }

}(window.app = window.app || {}, window.apos, jQuery, window._));
