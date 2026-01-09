import React from 'react'
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

export type BestSendWindows = {
    channel: string;
    day: string;
    hour: number;
    avg_open_rate: number;
    avg_click_rate: number; 
    avg_conversion_rate: number;
    avg_roi: number;
    campaign_count: number;
}
export const columns: ColumnDef<BestSendWindows>[] = [
    {
        accessorKey: "channel",
        header: () => <div>Channel</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("channel")}
          </div>
        ),
      },
      {
        accessorKey: "day",
        header: () => <div>Day</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("day")}
          </div>
        ),
      },
      {
        accessorKey: "hour",
        header: () => <div>Hour</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("hour")}
          </div>
        ),
      },
      {
        accessorKey: "avg_open_rate",
        header: () => <div>Avg Open Rate</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("avg_open_rate")}
          </div>
        ),
      },
      {
        accessorKey: "avg_click_rate",
        header: () => <div>Avg Click Rate</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("avg_click_rate")}
          </div>
        ),
      },
      {
        accessorKey: "avg_conversion_rate",
        header: () => <div>Avg Conversion Rate</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("avg_conversion_rate")}
          </div>
        ),
      },
      {
        accessorKey: "avg_roi",
        header: () => <div>Avg ROI</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("avg_roi")}
          </div>
        ),
      },
      {
        accessorKey: "campaign_count",
        header: () => <div>Campaign Count</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("campaign_count")}
          </div>
        ),
      },
]

const BestSendWindowsOutput = ({ data }: { data: BestSendWindows[] }) => {
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
          <div className="text-lg font-bold">Best Send Windows Table</div>
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

export default BestSendWindowsOutput