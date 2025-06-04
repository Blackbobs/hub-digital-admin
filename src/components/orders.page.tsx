'use client';

import React, { useState, useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Search } from 'lucide-react';

// Types
interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Shipped' | 'Processing' | 'Delivered';
}

// Mock data
const mockOrders: Order[] = [
  { id: '#1001', customerName: 'Sophia Clark', orderDate: '2023-08-15', totalAmount: 150.00, status: 'Shipped' },
  { id: '#1002', customerName: 'Ethan Bennett', orderDate: '2023-08-14', totalAmount: 220.00, status: 'Processing' },
  { id: '#1003', customerName: 'Olivia Carter', orderDate: '2023-08-13', totalAmount: 80.00, status: 'Delivered' },
  { id: '#1004', customerName: 'Liam Davis', orderDate: '2023-08-12', totalAmount: 300.00, status: 'Shipped' },
  { id: '#1005', customerName: 'Ava Evans', orderDate: '2023-08-11', totalAmount: 100.00, status: 'Processing' },
  { id: '#1006', customerName: 'Noah Foster', orderDate: '2023-08-10', totalAmount: 180.00, status: 'Delivered' },
  { id: '#1007', customerName: 'Isabella Green', orderDate: '2023-08-09', totalAmount: 250.00, status: 'Shipped' },
  { id: '#1008', customerName: 'Lucas Hayes', orderDate: '2023-08-08', totalAmount: 120.00, status: 'Processing' },
  { id: '#1009', customerName: 'Mia Ingram', orderDate: '2023-08-07', totalAmount: 200.00, status: 'Delivered' },
  { id: '#1010', customerName: 'Jackson Jones', orderDate: '2023-08-06', totalAmount: 90.00, status: 'Shipped' },
];

const columnHelper = createColumnHelper<Order>();

// Status component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default function OrdersDashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Order ID',
        cell: (info) => (
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('customerName', {
        header: 'Customer Name',
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('orderDate', {
        header: 'Order Date',
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('totalAmount', {
        header: 'Total Amount',
        cell: (info) => (
          <span className="text-gray-600">${info.getValue().toFixed(2)}</span>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue()} />,
        enableSorting: false,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            View Details
          </button>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: mockOrders,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="min-h-screen bg-white font-sans">
   

      {/* Main Content */}
      <div className="px-40 py-5">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
            <p className="text-gray-600">Manage and track all your orders</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Global Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-none bg-gray-100 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            {/* <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                Status
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                Date
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                Amount
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
          </div> */}

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {header.column.getCanSort() && (
                            <span className="text-gray-400">
                              {{
                                asc: ' ↑',
                                desc: ' ↓',
                              }[header.column.getIsSorted() as string] ?? ' ↕'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {table.getRowModel().rows.length} of {mockOrders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

