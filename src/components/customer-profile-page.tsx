'use client'

import React, { useMemo } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Bell } from 'lucide-react'

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

// Logo component
const AcmeLogo = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
    <g clipPath="url(#clip0_6_543)">
      <path
        d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_6_543">
        <rect width="48" height="48" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

// Header component


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