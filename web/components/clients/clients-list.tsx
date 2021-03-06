import { IconButton, Popover, Table, Whisper } from 'rsuite';
import { InnerCellProps } from 'rsuite-table/lib/Cell';

import PageIcon from '@rsuite/icons/Page';

import { AposHeadlessPieceResponse, ClientPiece, SortOrder } from '../../types';
import { EmailCell, MobileCell, TextCell } from '../tables';

function ActionCell({rowData, dataKey, ...props}: InnerCellProps) {
   const {notes} = rowData as ClientPiece;

   return <Table.Cell {...props}>
      {notes && <ShowNotesButton notes={notes}/>}
   </Table.Cell>;
}

function ShowNotesButton({notes}: { notes: string }) {
   return <Whisper speaker={<Popover><h1>PLOP</h1></Popover>} trigger={'click'}>
      <IconButton disabled={!notes} appearance="subtle" icon={<PageIcon/>}/>
   </Whisper>
}

interface ClientListProps {
   onSelect(client?: ClientPiece): void;

   onSortColumn(column: string, order?: SortOrder): void,

   data?: AposHeadlessPieceResponse<ClientPiece>,
   loading?: boolean,
   sortColumn: string,
   sortType: SortOrder
}

export function ClientsList({data, loading = false, onSelect, onSortColumn, sortColumn, sortType}: ClientListProps) {
   return <Table data={data?.results || []}
                 loading={loading}
                 onSortColumn={onSortColumn}
                 onRowClick={onSelect}
                 sortColumn={sortColumn}
                 sortType={sortType}>
      <Table.Column sortable flexGrow={1}>
         <Table.HeaderCell>First Name</Table.HeaderCell>
         <TextCell dataKey={'firstName'}/>
      </Table.Column>
      <Table.Column sortable flexGrow={1}>
         <Table.HeaderCell>Last Name</Table.HeaderCell>
         <TextCell dataKey={'lastName'}/>
      </Table.Column>
      <Table.Column flexGrow={1}>
         <Table.HeaderCell>Mobile</Table.HeaderCell>
         <MobileCell dataKey={'mobile'}/>
      </Table.Column>
      <Table.Column flexGrow={1}>
         <Table.HeaderCell>Email</Table.HeaderCell>
         <EmailCell dataKey={'email'}/>
      </Table.Column>
      <Table.Column>
         <Table.HeaderCell>Notes</Table.HeaderCell>
         <ActionCell/>
      </Table.Column>
   </Table>
}
