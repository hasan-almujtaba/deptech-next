import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'

import { Button } from 'components/ui/button'
import { DataTable } from 'components/ui/table'
import {
  CategoryTableAction,
  TCategory,
  useGetCategories,
} from 'features/category'
import { createColumn } from 'utils'

export const columnHelper = createColumnHelper<TCategory>()

export const columns = [
  columnHelper.display({
    id: 'name',
    header: () =>
      createColumn('Name', 'text-left text-[#202124] font-bold text-sm'),
    cell: (info) => info.row.original.name,
  }),
  columnHelper.display({
    id: 'description',
    header: () =>
      createColumn('Description', 'text-left text-[#202124] font-bold text-sm'),
    size: 200,
    cell: (info) => info.row.original.description,
  }),
  columnHelper.display({
    id: 'actions',
    size: 10,
    cell: (info) => <CategoryTableAction id={info.row.original.id} />,
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
