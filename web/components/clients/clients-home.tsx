import { useCallback, useRef, useState } from 'react';
import useSwr from 'swr';

import { AposHeadlessPieceResponse, ClientPiece, SortOrder } from '../../types';
import { ErrorPage } from '../error-page/error-page';

import { ClientsList } from './clients-list';
import { ClientListFilters } from './clients-list-filters';
import { ClientDetail } from './client-detail';

function fetcher(url) {
   return fetch(url).then((res) => res.json());
}

function useClients(column: string, order: SortOrder, filter: string) {
   const {data, error} = useSwr(`/api/clients?sort=${column}&order=${order}&${filter}`, fetcher, {
      revalidateIfStale: false,
   });

   const ref = useRef<AposHeadlessPieceResponse<ClientPiece>>(data);
   ref.current = data || ref.current;

   return {
      data: ref.current,
      loading: !data,
      error,
   }
}

export function ClientsHome() {
   const [selectedClient, setSelectedClient] = useState<ClientPiece | undefined>();
   const clearSelectedClient = useCallback(() => setSelectedClient(undefined), [setSelectedClient]);
   const [filter, setFilter] = useState('');
   const [sort, setSort] = useState<{ column: string, order: SortOrder }>({column: 'lastName', order: 'asc'});
   const onSortColumn = useCallback((column: string, order: SortOrder = 'asc') => {
      setSort({column, order});
   }, [setSort]);
   const {data, loading, error} = useClients(sort.column, sort.order, filter);

   return <>
      <ClientListFilters title={'Clients'} onChange={setFilter}/>
      {error ? <ErrorPage error={error}/> :
         <ClientsList
            data={data}
            loading={loading}
            onSelect={setSelectedClient}
            onSortColumn={onSortColumn}
            sortColumn={sort.column}
            sortType={sort.order}
         />}

      <ClientDetail close={clearSelectedClient} client={selectedClient}/>
   </>
}
