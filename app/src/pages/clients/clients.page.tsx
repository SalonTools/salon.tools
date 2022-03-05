import { useState } from 'react';
import { Table } from 'rsuite';
import { InnerCellProps } from 'rsuite-table/lib/Cell';

import { SortOrder, useClients } from '../../api';

function MobileCell({rowData, dataKey, ...props}: InnerCellProps) {
   const mobile = rowData[dataKey as keyof typeof rowData];
   return <Table.Cell {...props}>
      {mobile && <a href={`tel:${mobile}`}>{mobile}</a> || '-'}
   </Table.Cell>
}

function EmailCell({rowData, dataKey, ...props}: InnerCellProps) {
   const email = rowData[dataKey as keyof typeof rowData];
   return <Table.Cell {...props}>
      {email && <a href={`mailto:${email}`}>{email}</a> || '-'}
   </Table.Cell>
}

function TextCell({rowData, dataKey, ...props}: InnerCellProps) {
   const content = rowData[dataKey as keyof typeof rowData];
   return <Table.Cell {...props}>
      {content || '-'}
   </Table.Cell>
}

export function ClientsPage() {
   const [query, setQuery] = useState('');
   const [sort, setSort] = useState<{ column: string, order: SortOrder }>({column: 'lastName', order: 'asc'});

   const {data, error, isFetching} = useClients(query, sort.column, sort.order);

   if (isFetching && !data) {
      return <>
         <span>LOADING</span>
      </>;
   }

   if (error) {
      return <><h2>ERROR</h2><code>{String(error)}</code></>
   }

   const handleSortColumn = (column: string, order: SortOrder = 'asc') => {
      setSort({column, order});
   };

   return <>
      <h2>Clients</h2>
      <Table data={data!.results} onSortColumn={handleSortColumn}
             sortColumn={sort.column}
             sortType={sort.order}>
         <Table.Column sortable>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <TextCell dataKey={'firstName'}/>
         </Table.Column>
         <Table.Column sortable>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <TextCell dataKey={'lastName'}/>
         </Table.Column>
         <Table.Column>
            <Table.HeaderCell>Mobile</Table.HeaderCell>
            <MobileCell dataKey={'mobile'}/>
         </Table.Column>
         <Table.Column>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <EmailCell dataKey={'email'}/>
         </Table.Column>
      </Table>
   </>
}
