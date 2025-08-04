"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";
import { Search, ChevronDown } from "lucide-react";
import { Customer, useCustomers } from "@/services/customers.service";

export default function CustomersPage() {
  const { data: customers = [], isLoading } = useCustomers();
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper<Customer>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("username", {
        header: "Name",
        cell: (info) => <div className="text-[#111418]">{info.getValue()}</div>,
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => <div className="text-[#60758a]">{info.getValue()}</div>,
      }),
      columnHelper.accessor("createdAt", {
        header: "Registration Date",
        cell: (info) => (
          <div className="text-[#60758a]">
            {new Date(info.getValue()).toLocaleDateString()}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: () => (
          <button className="text-sm font-bold text-[#60758a] hover:text-[#111418] transition-colors">
            View Details
          </button>
        ),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (isLoading) {
    return <p className="p-10 text-center">Loading customers...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Main Content */}
      <div className="px-2 py-5 sm:px-6 lg:px-8 flex flex-1 justify-center">
        <div className="w-full max-w-7xl">
          {/* Page Header */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-[#111418] tracking-tight text-[32px] font-bold leading-tight">
                Customers
              </h1>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                Manage your customer base
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
              <div className="text-[#60758a] flex border-none bg-[#f0f2f5] items-center justify-center pl-4 rounded-l-lg">
                <Search size={24} />
              </div>
              <input
                placeholder="Search customers"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f5] focus:border-none h-full placeholder:text-[#60758a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 p-3 flex-wrap pr-4">
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f2f5] pl-4 pr-2 hover:bg-gray-200 transition-colors">
              <p className="text-[#111418] text-sm font-medium leading-normal">
                Status
              </p>
              <ChevronDown size={20} className="text-[#111418]" />
            </button>
            <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f2f5] pl-4 pr-2 hover:bg-gray-200 transition-colors">
              <p className="text-[#111418] text-sm font-medium leading-normal">
                Date Range
              </p>
              <ChevronDown size={20} className="text-[#111418]" />
            </button>
          </div>

          {/* Table */}
          <div className="px-4 py-3">
            <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
              <table className="flex-1">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-white">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-[#111418] text-sm font-medium leading-normal cursor-pointer hover:bg-gray-50"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center gap-2">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-t-[#dbe0e6] hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="h-[72px] px-4 py-2 align-middle"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Info */}
          <div className="px-4 py-2 text-sm text-[#60758a]">
            Showing {table.getRowModel().rows.length} of {customers.length}{" "}
            customers
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <footer className="flex flex-col gap-6 px-5 py-10 text-center">
            <p className="text-[#60758a] text-base font-normal leading-normal">
              @2024 Dropship Central
            </p>
          </footer>
        </div>
      </footer>
    </div>
  );
}
