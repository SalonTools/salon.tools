import { InnerCellProps } from 'rsuite-table/lib/Cell';
import { Table } from 'rsuite';

export function MobileCell({rowData, dataKey, ...props}: InnerCellProps) {
   const mobile = rowData[dataKey as keyof typeof rowData];
   return <Table.Cell {...props}>
      {mobile && <a href={`tel:${mobile}`}>{mobile}</a> || '-'}
   </Table.Cell>
}
