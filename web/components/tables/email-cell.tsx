import { Table } from 'rsuite';
import { InnerCellProps } from 'rsuite-table/lib/Cell';

export function EmailCell({rowData, dataKey, ...props}: InnerCellProps) {
   const email = rowData[dataKey as keyof typeof rowData];
   return <Table.Cell {...props}>
      {email && <a href={`mailto:${email}`}>{email}</a> || '-'}
   </Table.Cell>
}
