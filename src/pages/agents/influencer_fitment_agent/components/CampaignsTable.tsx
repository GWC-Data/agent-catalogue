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
import { Button } from '@/components/ui/button';
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
import { ChevronDown } from 'lucide-react';

export type Campaigns = {
  brand_name: string
  campaign_id: string
  campaign_name: string
  campaign_start_date: string
  campaign_end_date: string
  category_focus: string[]
  desired_tone: string
  }

  export const columns: ColumnDef<Campaigns>[] = [
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
      accessorKey: "brand_name",
      header: () => <div>Brand Name</div>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("brand_name")}
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
      accessorKey: "campaign_start_date",
      header: () => <div>Start Date</div>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("campaign_start_date")}
        </div>
      ),
    },
    {
      accessorKey: "campaign_end_date",
      header: () => <div>End Date</div>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("campaign_end_date")}
        </div>
      ),
    },
    {
      accessorKey: "category_focus",
      header: () => <div>Category Focus</div>,
      cell: ({ row }) => {
        const value = row.getValue("category_focus") as string[]
        return (
          <div className="font-medium">
            {value.join(", ")}
          </div>
        )
      },
    },
    {
      accessorKey: "desired_tone",
      header: () => <div>Desired Tone</div>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("desired_tone")}
        </div>
      ),
    },
  ]
  
export const CampaignsTable = ({ data }: { data: Campaigns[] }) => {
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
          <div className="text-lg font-bold">Campaigns Table</div>
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
  

