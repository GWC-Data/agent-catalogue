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

export type Vendor = {
  ingredient: string;
  vendor: string;
  price: number;
  delivery_days: number;
  rating: number;
}
export type VendorOrder = {
  qty: number
  vendor: {
    ingredient: string
    vendor: string
    price: number
    delivery_days: number
    rating: number
  }
}

export type VendorOrders = Record<string, VendorOrder>

export const columns: ColumnDef<Vendor>[] = [

    {
        accessorKey: "ingredient",
        header: () => <div>Ingredient</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("ingredient")}
          </div>
        ),
    },
    {
        accessorKey: "vendor",
        header: () => <div>Vendor</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("vendor")}
          </div>
        ),
    },
    {
        accessorKey: "price",
        header: () => <div>Price</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("price")}
          </div>
        ),
    },
    {
        accessorKey: "delivery_days",
        header: () => <div>Delivery Days</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("delivery_days")}
          </div>
        ),
    },
    {
        accessorKey: "rating",
        header: () => <div>Rating</div>,
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("rating")}
          </div>
        ),
    },
];

export const VendorTableOutput = ({ 
  data,
  vendorOutput
 }: { 
  data: Vendor[] 
  vendorOutput?: Vendor[]
}) => {
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
      {/* New feature - Vendor Cards */}
      <h2 className="text-xl font-semibold mb-4">
  Vendor Order Recommendations
</h2>
{vendorOutput && vendorOutput.length > 0 && (
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

    {vendorOutput.map((vendor, index) => (
      <div
        key={index}
        className="border rounded-md p-4 shadow-sm bg-white flex flex-col gap-2"
      >
        {/* Ingredient */}
        <div className="text-md font-semibold text-gray-800">
          {vendor.ingredient}
        </div>

        {/* Vendor Info */}
        <div className="text-sm space-y-1 text-gray-600">
          <div>
            Vendor: <span className="font-medium">{vendor.vendor}</span>
          </div>
          <div>
            Price: ₹<span className="font-medium">{vendor.price}</span>
          </div>
          <div>
            Delivery: <span className="font-medium">{vendor.delivery_days} days</span>
          </div>
          <div>
            Rating: <span className="font-medium">{vendor.rating}</span> ⭐
          </div>
        </div>
      </div>
    ))}

  </div>
)}

      <div className="flex items-center py-4">
        <div className="text-lg font-bold">Vendor Table</div>
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

