const {parse, addMinutes, format} = require('date-fns');

module.exports = (self, options) => {

   async function getServicesByIds (req, $in) {
      const result = await self.apos.modules.service.find(req, {_id: {$in}}, { title: 1, segments: 1 }).toArray();
      const haystack = new Map(result.map(s => [s._id, s]));

      if (result.length !== $in.length) {
         const missing = $in.filter(needle => !haystack.has(needle));

         throw new Error(`404: invalid serviceId: ${missing}`);
      }

      return $in.map(id => haystack.get(id));
   }

   function createSegment (booking, service, segment, start) {
      const end = addMinutes(start, segment.duration);

      return [
         {
            ...self.newInstance(),
            title: segment.name || service.title,
            date: booking.bookingDate,
            start: format(start, 'HH:mm:ss'),
            end: format(end, 'HH:mm:ss'),

            bookingId: booking._id,
            clientId: booking.clientId,
            employeeId: booking.employeeId,
            serviceId: service._id,
         },
         addMinutes(end, segment.gap)
      ];
   }

   self.createFromBooking = async (req, booking) => {
      const services = await getServicesByIds(req, booking.serviceIds);
      const insertions = [];

      let start = parse(`${ booking.bookingDate } ${ booking.bookingTime }`, 'yyyy-MM-dd HH:mm:ss', 0);

      for (const service of services) {
         service.segments.map(segment => {
            const [piece, next] = createSegment(booking, service, segment, start);

            start = next;

            insertions.push(self.insert(req, piece, {permissions: false}));
         });
      }

      return await Promise.all(insertions);
   };

}
