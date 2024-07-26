import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  RowSelectionState,
  TableMeta,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

import { Pagination } from './pagination'

type TProps<T> = {
  data?: T[]
  totalData?: number
  columns: ColumnDef<T, unknown>[]
  pageIndex?: number
  pageSize?: number
  pageCount?: number
  onPaginationChange?: (pagination: PaginationState) => void
  className?: string
  rowSelection?: RowSelectionState
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>
  hideTopPagination?: boolean
  hideBottomPagination?: boolean
  meta?: TableMeta<T>
  rightHeaderNode?: ReactNode
  reset?: number
}

export const DataTable = <T,>(props: TProps<T>) => {
  const {
    columns,
    data = [],
    pageIndex,
    pageSize,
    pageCount,
    onPaginationChange,
    rowSelection,
    setRowSelection,
    hideTopPagination,
    hideBottomPagination,
    meta,
    rightHeaderNode,
    totalData,
    reset,
  } = props

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 15,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    pageCount,
    meta,
  })

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange(pagination)
    }
  }, [pagination, onPaginationChange])

  useEffect(() => {
    table.resetPageIndex()
  }, [reset]) /* eslint-disable-line react-hooks/exhaustive-deps */

  const hasData = data.length > 0

  return (
    <div>
      {hasData ? (
        <div className="mb-[27px] flex items-center justify-between">
          {!hideTopPagination && (
            <Pagination
              table={table}
              totalData={totalData}
            />
          )}

          {rightHeaderNode && rightHeaderNode}
        </div>
      ) : undefined}

      <table className="w-full text-sm">
        <thead className="border-b pb-2">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2.5"
                >
                  {header.isPlaceholder
                    ? undefined
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {hasData ? (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="dark:bg-black-300 border-b border-[#C1C1C1] transition-colors hover:bg-[#F1F1F1]"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    style={{
                      width: cell.column.getSize(),
                    }}
                    key={cell.id}
                    className={twMerge(
                      'border-b p-2.5 align-top',
                      index === row.getVisibleCells().length - 1 ? 'pr-0' : ''
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={8}
                className="text-center"
              >
                <p className="mt-20 font-bold">Showing 0 Data</p>
              </td>
            </tr>
          </tbody>
        )}
      </table>

      {hasData && !hideBottomPagination ? (
        <div className="mt-4">
          <Pagination
            totalData={totalData}
            table={table}
          />
        </div>
      ) : undefined}
    </div>
  )
}
