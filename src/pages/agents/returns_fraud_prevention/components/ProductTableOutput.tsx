/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Product = {
  product_id: string;
  orders: number;
  returns: number;
  return_rate: number;
  risk_type: string;
  reasons: string[];
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_id",
    header: () => <div className="">Product ID</div>,
    cell: ({ row }) => <div className="font-medium">{row.getValue("product_id")}</div>,
  },
  {
    accessorKey: "orders",
    header: () => <div className="">Orders</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("orders")}</div>
    },
  },
  {
    accessorKey: "returns",
    header: () => <div className="">Returns</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("returns")}</div>
    },
  },
  {
    accessorKey: "return_rate",
    header: () => <div className="">Return Rate</div>,
    cell: ({ row }) => {
      return <div className="font-medium">
        {((row.getValue("return_rate") as number) * 100).toFixed(2)}%
      </div>
    },
  },
  {
    accessorKey: "risk_type",
    header: () => <div className="">Risk Type</div>,
    cell: ({ row }) => {
      const riskType = row.getValue("risk_type") as string;
      return (
        <div>
          {riskType.includes("high") ? (
            <span className="px-3 py-1 text-xs font-medium rounded-full 
                        bg-red-100 text-red-700 border border-red-300">
              High
            </span>
          )  : riskType.includes("medium") ? (
            <span className="px-3 py-1 text-xs font-medium rounded-full 
                        bg-green-100 text-green-700 border border-green-300">
              Medium
            </span>
          ) : (
            <span className="px-3 py-1 text-xs font-medium rounded-full 
                        bg-yellow-100 text-yellow-700 border border-yellow-300">
              Low
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "reasons",
    header: () => <div className="">Reasons</div>,
    cell: ({ row }) => {
    const reasons = row.getValue("reasons") as string[];

    return (
      <div className="flex flex-wrap gap-2">
        {reasons?.map((reason, index) => (
          <button
            key={index}
            className="px-3 py-1 text-xs font-medium rounded-full 
                       bg-blue-100 text-blue-700 border border-blue-300
                       hover:bg-blue-200"
          >
            {reason}
          </button>
        ))}
      </div>
    );
  },

  },
]

export function ProductTableOutput({ data }: { data: Product[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full bg-white rounded-md px-6 py-3 shadow-sm border border-gray-200">
      <div className="flex items-center py-4">
        <div className="text-lg font-bold">Product Table</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="bg-[#6f2b8b] text-white">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
