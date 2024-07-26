// import { ArrowCollapseIcon, ArrowIcon, MagnifyIcon } from '@heroicons/react/20'
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
} from '@heroicons/react/20/solid'
import { Table } from '@tanstack/react-table'

export type TProps<T> = {
  table: Table<T>
  totalData?: number
}
export const Pagination = <T,>(props: TProps<T>) => {
  const { table, totalData } = props

  return (
    <div className="flex items-center">
      <div className="mr-3 text-xs font-semibold">{totalData ?? 0} Data</div>

      <div className="mr-3 flex items-center space-x-1">
        <button
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors hover:bg-[#FCB017] hover:text-white disabled:text-[#C1C1C1] disabled:hover:bg-transparent"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronDoubleLeftIcon />
        </button>

        <button
          className="flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors hover:bg-[#FCB017] hover:text-white disabled:text-[#C1C1C1] disabled:hover:bg-transparent"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon />
        </button>

        <p className="mx-1 w-8 text-center text-xs font-semibold">
          {table.getState().pagination.pageIndex + 1}
        </p>

        <button
          className="flex h-[30px] w-[30px] -rotate-90 items-center justify-center rounded-full transition-colors hover:bg-[#FCB017] hover:text-white disabled:text-[#C1C1C1] disabled:hover:bg-transparent"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronLeftIcon />
        </button>

        <button
          className="flex h-[30px] w-[30px] rotate-180 items-center justify-center rounded-full transition-colors hover:bg-[#FCB017] hover:text-white disabled:text-[#C1C1C1] disabled:hover:bg-transparent"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronDoubleLeftIcon />
        </button>
      </div>
    </div>
  )
}
