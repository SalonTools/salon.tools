import { Table } from 'rsuite';
import { InnerCellProps } from 'rsuite-table/lib/Cell';

export function TextCell({rowData, dataKey, ...props}: InnerCellProps) {
   const content = rowData[dataKey as keyof typeof rowData];
   return <Table.Cell {...props}>
      {content || '-'}
   </Table.Cell>
}
