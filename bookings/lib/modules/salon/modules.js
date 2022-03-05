module.exports = {
   'booking': { seoEnabled: false, ...restApi(), },
   'booking-type': { seoEnabled: false, ...restApi(), },
   'client': { seoEnabled: false, ...restApi(), },
   'calendar': { seoEnabled: false, ...restApi(), },
   'employee': { seoEnabled: false, ...restApi(), },
   'level': { seoEnabled: false, ...restApi(), },
   'service': { seoEnabled: false, ...restApi(), },

   'client-pages': { seoEnabled: false, ...restApi(), },
};

function restApi(safeFilters = []) {
   return {
      restApi: {
         safeFilters: ['slug', 'title', 'sort', ...safeFilters],
      },
   };
}
