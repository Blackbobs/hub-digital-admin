'use client';

import React, { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/react-table';
import Link from 'next/link';
import { Order, OrderStatus } from '@/interface/order';
import StatusBadge from './status-badge';
import { useOrders } from '@/hooks/useOrder';

const columnHelper = createColumnHelper<Order>();

export default function OrdersDashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');

  // Get all orders and properly type the response
  const { data: ordersResponse, isLoading, isError } = useOrders();
  
  // Ensure we're working with an array
  const allOrders: Order[] = useMemo(() => {
    if (!ordersResponse) return [];
    // Handle both cases where response might be an array or have a data property
    console.log(ordersResponse)
    return Array.isArray(ordersResponse) ? ordersResponse : 
           ordersResponse.data ? ordersResponse.data : [];
  }, [ordersResponse]);

  // Client-side filtering
  const filteredData = useMemo(() => {
    return allOrders.filter((order: Order) => {
      // Search filter
      const matchesSearch = 
        order._id.toLowerCase().includes(globalFilter.toLowerCase()) ||
        order.user.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        (order.user.email && order.user.email.toLowerCase().includes(globalFilter.toLowerCase()));

      // Status filter
      const matchesStatus = statusFilter === '' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allOrders, globalFilter, statusFilter]);


  const columns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        header: 'Order ID',
        cell: (info) => (
          <span className="font-medium text-gray-900">#{info.getValue().slice(-6)}</span>
        ),
      }),
      columnHelper.accessor('user.name', {
        header: 'Customer Name',
        cell: (info) => (
          <span className="text-gray-600">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Order Date',
        cell: (info) => (
          <span className="text-gray-600">
            {new Date(info.getValue()).toLocaleDateString()}
          </span>
        ),
      }),
      columnHelper.accessor('totalAmount', {
        header: 'Total Amount',
        cell: (info) => (
          <div className="text-gray-600">${info.getValue().toFixed(2)}</div>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue()} />,
        filterFn: (row, _, value) => {
          if (!value) return true;
          return row.original.status === value;
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Link 
            href={`/orders/${row.original._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            View Details
          </Link>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="text-red-500">Error loading orders</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
            <p className="text-gray-600">Manage and track all your orders</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders by ID, name or email"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <div className="relative min-w-[150px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as OrderStatus | '')}
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex items-center">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Results Info */}
          <div className="px-4 py-3 text-sm text-gray-600 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            Showing {table.getRowModel().rows.length} of {allOrders.length} orders
          </div>
        </div>
      </div>
    </div>
  );
}