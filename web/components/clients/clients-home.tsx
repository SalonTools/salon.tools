import { useCallback, useRef, useState } from 'react';
import useSwr from 'swr';

import { AposHeadlessPieceResponse, ClientPiece, SortOrder } from '../../types';

import { ClientsList } from './clients-list';
import { ClientListFilters } from './clients-list-filters';

function fetcher(url) {
   return fetch(url).then((res) => res.json());
}

export function ClientsHome() {
   const [filter, setFilter] = useState('');
   const [sort, setSort] = useState<{ column: string, order: SortOrder }>({column: 'lastName', order: 'asc'});
   const onSortColumn = useCallback((column: string, order: SortOrder = 'asc') => {
      setSort({column, order});
   }, [setSort]);
   const {data: list, error} = useSwr(`/api/clients?sort=${sort.column}&order=${sort.order}&${filter}`, fetcher, {
      revalidateIfStale: false,
   });

   const data = useRef<AposHeadlessPieceResponse<ClientPiece>>(list);
   data.current = list;

   return <>
      <ClientListFilters title={'Clients'} onChange={setFilter}/>
      {error ? <ErrorPage error={error}/> :
         <ClientsList
            data={data.current}
            loading={!list}
            onSortColumn={onSortColumn}
            sortColumn={sort.column}
            sortType={sort.order}/>}
   </>
}

function ErrorPage({error}: { error: Error }) {
   return <>
      <h2>Error</h2>
      <code>{String(error)}</code>
   </>
}
