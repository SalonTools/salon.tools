import { SortOrder } from '../../types';

const API = `http://localhost:3002/api/v1/client`;
const SORTABLE = [
   'lastName', 'firstName',
];
const FILTERABLE = [
   'name',
   'email',
]

function sortParam (column: string, order: SortOrder = 'asc') {
   return {
      [`sort[${SORTABLE.includes(column) ? column : SORTABLE[0]}]`]: order === 'asc' ? '1' : '-1',
   };
}

function filterParam (query: Record<string, string>) {
   return FILTERABLE.reduce((all, key) => {
      if (typeof query[key] === 'string') {
         all[key] = query[key];
      }
      return all;
   }, Object.create(null));
}

export default async function handler(req, res) {
   const { sort = 'lastName', order = 'asc' } = req.query;

   const query = new URLSearchParams({
      ...sortParam(sort, order),
      ...filterParam(req.query),
   });
   const remote = await fetch(`${API}?${query}`);
   const json = await remote.json();

   res.json(json);
}
