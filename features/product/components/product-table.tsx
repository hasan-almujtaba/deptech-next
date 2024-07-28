import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'

import { Button } from 'components/ui/button'
import { DataTable } from 'components/ui/table'
import { useGetProducts } from 'features/product'
import { createColumn } from 'utils'

import { TProduct } from '../types'

import { ProductTableAction } from './product-table-action'

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const columnHelper = createColumnHelper<TProduct>()

export const columns = [
  columnHelper.display({
    id: 'image',
    header: () =>
      createColumn('Image', 'text-left text-[#202124] font-bold text-sm'),
    cell: (info) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={baseUrl + '/uploads/' + info.row.original.image}
        alt="image"
      />
    ),
  }),
  columnHelper.display({
    id: 'name',
    header: () =>
      createColumn('Name', 'text-left text-[#202124] font-bold text-sm'),
    cell: (info) => info.row.original.name,
  }),
  columnHelper.display({
    id: 'description',
    size: 200,
    header: () =>
      createColumn('Description', 'text-left text-[#202124] font-bold text-sm'),
    cell: (info) => info.row.original.description,
  }),
  columnHelper.display({
    id: 'actions',
    size: 10,
    cell: (info) => <ProductTableAction id={info.row.original.id} />,
  }),
]

export const ProductTable = () => {
  const { data } = useGetProducts()
  const category = data?.data

  return (
    <div>
      <div className="text-right">
        <Button asChild>
          <Link href="/dashboard/product/create">Add New Product</Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={category}
      />
    </div>
  )
}
