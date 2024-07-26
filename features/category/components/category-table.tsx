import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'

import { Button } from 'components/ui/button'
import { DataTable } from 'components/ui/table'
import { TCategory, useGetCategory } from 'features/category'

export const columnHelper = createColumnHelper<TCategory>()

export const columns = [
  columnHelper.display({
    id: 'name',
    size: 10,
    cell: (info) => info.row.original.name,
  }),
  columnHelper.display({
    id: 'description',
    size: 10,
    cell: (info) => info.row.original.description,
  }),
]

export const CategoryTable = () => {
  const { data } = useGetCategory()
  const category = data.data

  return (
    <div>
      <div className="text-right">
        <Button asChild>
          <Link href="/dashboard/category/create">Add New Category</Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={category}
      />
    </div>
  )
}
