import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'

import { Button } from 'components/ui/button'
import { DataTable } from 'components/ui/table'
import { createColumn } from 'utils'

import { useGetTransactions } from '../hooks'
import { TTransaction } from '../types'

export const columnHelper = createColumnHelper<TTransaction>()

export const columns = [
  columnHelper.display({
    id: 'type',
    header: () =>
      createColumn('Type', 'text-left text-[#202124] font-bold text-sm'),
    cell: (info) => info.row.original.type,
  }),
  columnHelper.display({
    id: 'product',
    size: 200,
    header: () =>
      createColumn('Amount', 'text-left text-[#202124] font-bold text-sm'),
    cell: (info) =>
      info.row.original.items.map((item) => (
        <div key={item.id}>
          <p>
            <span className="font-bold">Product</span> : {item.product.name}
          </p>
          <p>
            <span className="font-bold">Quantity</span> : {item.quantity}
          </p>
        </div>
      )),
  }),
]

export const TransactionTable = () => {
  const { data } = useGetTransactions()
  const category = data?.data

  return (
    <div>
      <div className="text-right">
        <Button asChild>
          <Link href="/dashboard/transaction/create">Add New Transaction</Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={category}
      />
    </div>
  )
}
