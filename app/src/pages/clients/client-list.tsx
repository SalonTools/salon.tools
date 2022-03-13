import { IconButton, Popover, Table, Whisper } from 'rsuite';
import { InnerCellProps } from 'rsuite-table/lib/Cell';

import PageIcon from '@rsuite/icons/Page';

import { ClientPiece, SortOrder } from '../../api';
import { AposHeadlessPieceResponse } from '../../api/pieces';


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

function ActionCell({rowData, dataKey, ...props}: InnerCellProps) {
   const {notes} = rowData as ClientPiece;

   return <Table.Cell {...props}>
      {notes && <ShowNotesButton notes={notes} />}
   </Table.Cell>;
}

function ShowNotesButton ({notes}: {notes: string}) {
   return <Whisper speaker={<Popover><h1>PLOP</h1></Popover>} trigger={'click'}>
      <IconButton disabled={!notes} appearance="subtle" icon={<PageIcon/>}/>
   </Whisper>
}

interface ClientListProps {
   onSortColumn(column: string, order?: SortOrder): void,

   data?: AposHeadlessPieceResponse<ClientPiece>,
   sortColumn: string,
   sortType: SortOrder
}

export function ClientList({data, onSortColumn, sortColumn, sortType}: ClientListProps) {
   return <Table data={data?.results || []} onSortColumn={onSortColumn}
                 sortColumn={sortColumn}
                 sortType={sortType}>
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
      <Table.Column>
         <Table.HeaderCell>Notes</Table.HeaderCell>
         <ActionCell/>
      </Table.Column>
   </Table>
}
