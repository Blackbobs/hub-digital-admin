'use client'

import React, { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Customer, useCustomer } from '@/services/customers.service'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Order } from '@/interface/order'
import Link from 'next/link'

// Breadcrumb component
const Breadcrumb = ({ customerName }: { customerName: string }) => (
  <div className="flex flex-wrap gap-2 p-4">
    <Link href="/customers" className="text-gray-500 text-base font-medium leading-normal hover:text-gray-700">
      Customers
    </Link>
    <span className="text-gray-500 text-base font-medium leading-normal">/</span>
    <span className="text-gray-900 text-base font-medium leading-normal">{customerName}</span>
  </div>
)

// Contact info component
const ContactInfo = ({ customer }: { customer: Customer }) => (
  <div>
    <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-4">
      Contact Information
    </h3>
    <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-300 py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Email</p>
        <p className="text-gray-900 text-sm font-normal leading-normal">{customer.email}</p>
      </div>
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-300 py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Phone</p>
        <p className="text-gray-900 text-sm font-normal leading-normal">
          {customer.phone || 'Not provided'}
        </p>
      </div>
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-300 py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Address</p>
        <p className="text-gray-900 text-sm font-normal leading-normal">
          {customer.address || 'Not provided'}
        </p>
      </div>
    </div>
  </div>
)

// Orders table component
const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const columnHelper = createColumnHelper<Order>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('_id', {
        header: 'Order ID',
        cell: info => (
          <span className="text-gray-900 text-sm font-normal leading-normal">
            {`ORD-${info.getValue().toString().slice(-6).toUpperCase()}`}
          </span>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Date',
        cell: info => (
          <span className="text-gray-500 text-sm font-normal leading-normal">
            {new Date(info.getValue()).toLocaleDateString()}
          </span>
        ),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => (
          <span className="text-gray-500 text-sm font-normal leading-normal capitalize">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('totalAmount', {
        header: 'Total',
        cell: info => (
          <span className="text-gray-500 text-sm font-normal leading-normal">
            ${info.getValue().toFixed(2)}
          </span>
        ),
      }),
    ],
    [columnHelper]
  )

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-4">
        Orders
      </h3>
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-xl border border-gray-300 bg-white">
          <table className="flex-1">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-white">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-gray-900 text-sm font-medium leading-normal"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-t border-t-gray-300">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="h-[72px] px-4 py-2 text-sm font-normal leading-normal"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Main component
export default function CustomerProfile() {
  const { slug } = useParams()
  const { data: customer, isLoading, error } = useCustomer(slug as string)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="text-red-500">Error loading customer details</div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <div className="text-gray-500">Customer not found</div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-6 lg:px-8 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-4xl flex-1">
            <Breadcrumb customerName={customer.username} />
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">
                  {customer.username}
                </p>
                <p className="text-gray-500 text-sm font-normal leading-normal">
                  Customer since {new Date(customer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <ContactInfo customer={customer} />
            {/* You would fetch orders for this customer here */}
            <OrdersTable orders={[]} />
          </div>
        </div>
      </div>
    </div>
  )
}