'use client'

import React, { useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
// import { Bell } from 'lucide-react'

// Types
interface Order {
  id: string
  date: string
  total: string
}

interface Customer {
  name: string
  email: string
  phone: string
  address: string
  memberSince: string
  avatar: string
}

// Sample data
const customer: Customer = {
  name: 'Emily Carter',
  email: 'emily.carter@email.com',
  phone: '(555) 123-4567',
  address: '123 Main Street, Anytown, CA 91234',
  memberSince: 'January 15, 2023',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8I7OVS7SYOBgnzvQoLFdqbB7AvF4Y0uW_h8NPyE6cZihIX4Y2N2KMsxAmz3JgQI65XamKks1VPAChJCvSiCaC566v8ddMt7mXxL3sV3lzKKStd3UvW994EUgqhTg2CCbRt6ga8ImtGtQtIx5-DZSOQlM724kcZv_gksZXa7U5JknqHBgVqamkb5usiL_cZGfmy3kW2UsYJNwjW_qnprWXaO0w3tVZT2M1X-bPxUr_OiSXDj0C6fdYOL2ExIhjkbgRezDsIGledbeV'
}

const orders: Order[] = [
  { id: '#12345', date: 'March 10, 2023', total: '$75.00' },
  { id: '#67890', date: 'February 20, 2023', total: '$120.50' },
  { id: '#11223', date: 'January 25, 2023', total: '$50.00' },
]





// Breadcrumb component
const Breadcrumb = ({ customerName }: { customerName: string }) => (
  <div className="flex flex-wrap gap-2 p-4">
    <a className="text-gray-500 text-base font-medium leading-normal hover:text-gray-700" href="#">Customers</a>
    <span className="text-gray-500 text-base font-medium leading-normal">/</span>
    <span className="text-gray-900 text-base font-medium leading-normal">{customerName}</span>
  </div>
)

// Contact info component
const ContactInfo = ({ customer }: { customer: Customer }) => (
  <div>
    <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-4">Contact Information</h3>
    <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-300 py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Email</p>
        <p className="text-gray-900 text-sm font-normal leading-normal">{customer.email}</p>
      </div>
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-300 py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Phone</p>
        <p className="text-gray-900 text-sm font-normal leading-normal">{customer.phone}</p>
      </div>
      <div className="col-span-2 grid grid-cols-subgrid border-t border-t-gray-300 py-5">
        <p className="text-gray-500 text-sm font-normal leading-normal">Address</p>
        <p className="text-gray-900 text-sm font-normal leading-normal">{customer.address}</p>
      </div>
    </div>
  </div>
)

// Orders table component with TanStack Table
const OrdersTable = ({ orders }: { orders: Order[] }) => {
  const columnHelper = createColumnHelper<Order>()

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Order ID',
        cell: info => (
          <span className="text-gray-900 text-sm font-normal leading-normal">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: info => (
          <span className="text-gray-500 text-sm font-normal leading-normal">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('total', {
        header: 'Total',
        cell: info => (
          <span className="text-gray-500 text-sm font-normal leading-normal">
            {info.getValue()}
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
      <h3 className="text-gray-900 text-lg font-bold leading-tight tracking-tight px-4 pb-2 pt-4">Orders</h3>
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
  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans">
      <div className="layout-container flex h-full grow flex-col">
    
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-4xl flex-1">
            <Breadcrumb customerName={customer.name} />
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-gray-900 tracking-tight text-3xl font-bold leading-tight">
                  {customer.name}
                </p>
                <p className="text-gray-500 text-sm font-normal leading-normal">
                  Customer since {customer.memberSince}
                </p>
              </div>
            </div>
            <ContactInfo customer={customer} />
            <OrdersTable orders={orders} />
          </div>
        </div>
      </div>
    </div>
  )
}