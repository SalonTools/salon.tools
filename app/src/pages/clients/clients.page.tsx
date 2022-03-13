import { ReactNode, useCallback, useState } from 'react';
import { Button, Input, InputGroup, Nav, Navbar, Stack } from 'rsuite';

import { Search } from '@rsuite/icons';

import { SortOrder, useClients } from '../../api';

import { ClientList } from './client-list';

export function ClientsPage() {
   const [query, setQuery] = useState('');
   const [sort, setSort] = useState<{ column: string, order: SortOrder }>({column: 'lastName', order: 'asc'});
   const onSortColumn = useCallback((column: string, order: SortOrder = 'asc') => {
      setSort({column, order});
   }, [setSort]);

   const {data, error, isFetching} = useClients(query, sort.column, sort.order);

   if (isFetching && !data) {
      return <>
         <span>LOADING</span>
      </>;
   }

   if (error) {
      return <><h2>ERROR</h2><code>{String(error)}</code></>
   }

   return <>
      <ClientListFilters title={'Clients'} />
      <ClientList data={data} onSortColumn={onSortColumn} sortColumn={sort.column} sortType={sort.order}/>
   </>
}

function ClientListFilters ({title}: {title?: ReactNode}) {
   return <Stack justifyContent={'space-between'}>
      <h2>{title}</h2>
      <InputGroup>
         <Input />
         <InputGroup.Button>
            <Search />
         </InputGroup.Button>
      </InputGroup>
   </Stack>
}
