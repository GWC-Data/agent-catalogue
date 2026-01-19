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

export type PricingForecast = {
    sku_id: string
    forecasted_demand: number
    selected_vendor: string
    initial_price: number
    mid_price: number
    final_price: number
  }

type PricingForecastProps = {
    data: PricingForecast[];
    onApprove: () => void;
  };


export const columns: ColumnDef<PricingForecast>[] = [
    {
        accessorKey: "sku_id",
        header: () => <div>SKU ID</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("sku_id")}
          </div>
        ),
      },
      {
        accessorKey: "forecasted_demand",
        header: () => <div>Forecasted Demand</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("forecasted_demand")}
          </div>
        ),
      },
      {
        accessorKey: "selected_vendor",
        header: () => <div>Selected Vendor</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("selected_vendor")}
          </div>
        ),
      },
      {
        accessorKey: "initial_price",
        header: () => <div>Initial Price</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            ${row.getValue("initial_price")}
          </div>
        ),
      },
      {
        accessorKey: "mid_price",
        header: () => <div>Mid Price</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            ${row.getValue("mid_price")}
          </div>
        ),
      },
      {
        accessorKey: "final_price",
        header: () => <div>Final Price</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            ${row.getValue("final_price")}
          </div>
        ),
      },
]

export function AgentOutputTable({
    data,
    onApprove
  }: PricingForecastProps) {
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
      <div className="flex items-center justify-between w-full mb-4">
  <div className="text-lg font-bold">
 Agent Output Table
  </div>

  <div className="flex gap-5">
    <Button onClick={onApprove}>Approve</Button>

  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">
        Columns <ChevronDown />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      {table
        .getAllColumns()
        .filter((column) => column.getCanHide())
        .map((column) => (
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
        ))}
    </DropdownMenuContent>
  </DropdownMenu>
</div>
</div>
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
