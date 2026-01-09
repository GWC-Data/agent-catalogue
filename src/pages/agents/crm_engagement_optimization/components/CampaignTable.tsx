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

export type Campaign = {
    campaign_id: string;
    campaign_name: string;
      campaign_goal: string;
      channel: string;
      message_variant: string;
      audience_segment: string;
      revenue: number;
      cost: number;
  }

  export const columns: ColumnDef<Campaign>[] = [
    {
        accessorKey: "campaign_id",
        header: () => <div>Campaign ID</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("campaign_id")}
          </div>
        ),
      },
      {
        accessorKey: "campaign_name",
        header: () => <div>Campaign Name</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("campaign_name")}
          </div>
        ),
      },
      {
        accessorKey: "campaign_goal",
        header: () => <div>Campaign Goal</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("campaign_goal")}
          </div>
        ),
      },
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
        accessorKey: "message_variant",
        header: () => <div>Message Variant</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("message_variant")}
          </div>
        ),
      },
      {
        accessorKey: "audience_segment",
        header: () => <div>Audience Segment</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("audience_segment")}
          </div>
        ),
      },
      {
        accessorKey: "revenue",
        header: () => <div>Revenue</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("revenue")}
          </div>
        ),
      },
      {
        accessorKey: "cost",
        header: () => <div>Cost</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("cost")}
          </div>
        ),
      },
      
  ]


export const CampaignTable = ({ data } : { data: Campaign[] }) => {
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
          <div className="text-lg font-bold">Campaign Table</div>
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


