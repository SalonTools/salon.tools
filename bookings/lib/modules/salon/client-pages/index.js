module.exports = {
   extend: 'apostrophe-pieces-pages',
   piecesFilters: [
      { name: 'firstName', counts: true },
      { name: 'lastName', counts: true, safeFor: 'public' },
      { name: 'sort', counts: true, safeFor: 'public' },
   ],
}
