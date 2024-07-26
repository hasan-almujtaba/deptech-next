import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'

import { Button } from 'components/ui/button'
import { DataTable } from 'components/ui/table'
import { TCategory, useGetCategories } from 'features/category'

export const columnHelper = createColumnHelper<TCategory>()

export const columns = [
  columnHelper.display({
    id: 'name',
    cell: (info) => info.row.original.name,
  }),
  columnHelper.display({
    id: 'description',
    size: 200,
    cell: (info) => info.row.original.description,
  }),
  columnHelper.display({
    id: 'actions',
    size: 10,
    cell: (info) => (
      <>
        <div className="flex justify-end gap-x-5">
          <Button
            className="w-40"
            asChild
          >
            <Link href={`/dashboard/category/${info.row.original.id}/edit/`}>
              Edit
            </Link>
          </Button>
          <Button
            className="w-40"
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </>
    ),
  }),
]

export const CategoryTable = () => {
  const { data } = useGetCategories()
  const category = data?.data

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
