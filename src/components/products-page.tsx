"use client";
import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Bell, Search, ChevronDown, Edit } from "lucide-react";
import Modal from "@/lib/Modal";
import AddProductForm from "./add-product-form";

const productData = [
  {
    id: 1,
    name: "Eco-Friendly Bamboo Toothbrushes",
    type: "Physical",
    price: 5.99,
    stock: 150,
  },
  {
    id: 2,
    name: "Digital Art Prints - Abstract Designs",
    type: "Digital",
    price: 12.5,
    stock: "Unlimited",
  },
  {
    id: 3,
    name: "Organic Cotton T-shirts - Various Sizes",
    type: "Physical",
    price: 19.99,
    stock: 80,
  },
  {
    id: 4,
    name: "E-book: 'Sustainable Living Guide'",
    type: "Digital",
    price: 9.99,
    stock: "Unlimited",
  },
  {
    id: 5,
    name: "Handmade Soap Bars - Natural Scents",
    type: "Physical",
    price: 7.5,
    stock: 120,
  },
  {
    id: 6,
    name: "Online Course: 'Mindfulness Meditation'",
    type: "Digital",
    price: 49.99,
    stock: "Unlimited",
  },
  {
    id: 7,
    name: "Recycled Paper Notebooks",
    type: "Physical",
    price: 3.5,
    stock: 200,
  },
  {
    id: 8,
    name: "Podcast Series: 'Entrepreneurship Insights'",
    type: "Digital",
    price: 29.99,
    stock: "Unlimited",
  },
  {
    id: 9,
    name: "Reusable Water Bottles - Stainless Steel",
    type: "Physical",
    price: 14.99,
    stock: 60,
  },
  {
    id: 10,
    name: "Digital Photography Presets",
    type: "Digital",
    price: 15.0,
    stock: "Unlimited",
  },
];

type Product = {
  id: number;
  name: string;
  type: string;
  price: number;
  stock: number | string;
};

const columnHelper = createColumnHelper<Product>();

export default function DropshipProducts() {
  const [data, setData] = useState(productData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [open, setOpen] = useState(false);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Product Name",
        cell: (info) => (
          <div className="font-normal text-gray-900">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => <div className="text-gray-600">{info.getValue()}</div>,
      }),
      columnHelper.accessor("price", {
        header: "Price",
        cell: (info) => (
          <div className="text-gray-600">${info.getValue().toFixed(2)}</div>
        ),
      }),
      columnHelper.accessor("stock", {
        header: "Stock",
        cell: (info) => <div className="text-gray-600">{info.getValue()}</div>,
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: () => (
          <button className="text-gray-600 hover:text-[#663399] cursor-pointer font-bold text-sm tracking-wide transition-colors">
            <Edit className="w-4 h-4 inline mr-1" />
            Edit
          </button>
        ),
      }),
    ],
    []
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesType = typeFilter === "" || item.type === typeFilter;
      const matchesStock =
        stockFilter === "" ||
        (stockFilter === "In Stock" &&
          typeof item.stock === "number" &&
          item.stock > 0) ||
        (stockFilter === "Unlimited" && item.stock === "Unlimited") ||
        (stockFilter === "Low Stock" &&
          typeof item.stock === "number" &&
          item.stock < 50);

      return matchesType && matchesStock;
    });
  }, [data, typeFilter, stockFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="px-40 py-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <button
              onClick={() => setOpen(true)}
              className="px-5 py-2 bg-gray-100 text-[#663399] text-sm font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Add Product
            </button>
          </div>

          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <AddProductForm />
          </Modal>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search products"
                className="w-full h-12 pl-12 pr-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3 p-3">
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-8 pl-4 pr-8 bg-gray-100 rounded-lg text-sm font-medium text-gray-900 border-0 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="h-8 pl-4 pr-8 bg-gray-100 rounded-lg text-sm font-medium text-gray-900 border-0 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">All Stock</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Unlimited">Unlimited</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="p-4">
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="bg-white border-b border-gray-200"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                          onClick={header.column.getToggleSortingHandler()}
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
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-4 text-sm">
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

          {/* Results Info */}
          <div className="px-4 py-2 text-sm text-gray-600">
            Showing {table.getRowModel().rows.length} of {data.length} products
          </div>
        </div>
      </div>
    </div>
  );
}
