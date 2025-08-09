"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { Search, ChevronDown } from "lucide-react";
import Modal from "@/lib/Modal";
import AddProductForm from "./add-product-form";
import { useProducts } from "@/services/products.service";
import { Product, ProductType, StockFilter } from "@/interface/product";
import EditProductForm from "./edit-product-form";

// const columnHelper = createColumnHelper<Product>();

export default function Products() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProductType | "">("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data = [], isLoading, refetch } = useProducts();

  const filteredData = useMemo(() => {
    return data.filter((item: Product) => {
      // Search filter
      const matchesSearch =
        item.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.description?.toLowerCase().includes(globalFilter.toLowerCase());

      // Type filter
      const matchesType = typeFilter === "" || item.type === typeFilter;

      // Stock filter
      const matchesStock =
        stockFilter === "" ||
        (stockFilter === "In Stock" && item.stock && item.stock > 0) ||
        (stockFilter === "Low Stock" && item.stock && item.stock < 50) ||
        (stockFilter === "Unlimited" && item.stock === undefined);

      return matchesSearch && matchesType && matchesStock;
    });
  }, [data, globalFilter, typeFilter, stockFilter]);

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Product Name",
        cell: (info) => {
          const description = info.row.original.description || "";
          const maxWords = 10;
          const truncatedDescription =
            description.split(" ").length > maxWords
              ? description.split(" ").slice(0, maxWords).join(" ") + "..."
              : description;

          return (
            <div className="font-normal text-gray-900">
              {info.getValue<string>()}
              {description && (
                <p className="text-xs text-gray-500 mt-1">
                  {truncatedDescription}
                </p>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: (info) => (
          <span className="capitalize text-gray-600">
            {info.getValue<string>()}
          </span>
        ),
        filterFn: (row, _, value) => {
          if (!value) return true;
          return row.original.type === value;
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => (
          <div className="text-gray-600">
            ${info.getValue<number>().toFixed(2)}
          </div>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: (info) => {
          const stock = info.getValue<number | undefined>();
          let display = stock?.toString() ?? "Unlimited";
          let className = "text-gray-600";

          if (stock !== undefined) {
            if (stock === 0) {
              display = "Out of Stock";
              className = "text-red-500";
            } else if (stock < 50) {
              display = `${stock} (Low)`;
              className = "text-yellow-500";
            }
          }

          return <div className={className}>{display}</div>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => setEditingProduct(row.original)}
            className="text-gray-600 hover:text-[#663399] cursor-pointer font-bold text-sm tracking-wide transition-colors"
          >
            Edit
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleProductCreated = () => {
    setOpen(false);
    refetch();
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="px-4 py-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Products
            </h1>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 bg-[#663399] text-white text-sm font-medium rounded-md hover:bg-[#663399d6] transition-colors whitespace-nowrap"
              >
                Add Product
              </button>
            </div>
          </div>

          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <div className="md:p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <AddProductForm onSuccess={handleProductCreated} />
            </div>
          </Modal>

          <Modal
            isOpen={!!editingProduct}
            onClose={() => setEditingProduct(null)}
          >
            <div className="md:p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
              {editingProduct && (
                <EditProductForm
                  product={editingProduct}
                  onSuccess={() => {
                    setEditingProduct(null);
                    refetch();
                  }}
                  onClose={() => setEditingProduct(null)}
                />
              )}
            </div>
          </Modal>

          <div className="space-y-4 p-4">
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#663399] focus:border-[#663399] outline-none"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative min-w-[150px]">
                <select
                  value={typeFilter}
                  onChange={(e) =>
                    setTypeFilter(e.target.value as ProductType | "")
                  }
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#663399] focus:border-[#663399] outline-none appearance-none"
                >
                  <option value="">All Types</option>
                  <option value="physical">Physical</option>
                  <option value="digital">Digital</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>

              <div className="relative min-w-[150px]">
                <select
                  value={stockFilter}
                  onChange={(e) =>
                    setStockFilter(e.target.value as StockFilter)
                  }
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#663399] focus:border-[#663399] outline-none appearance-none"
                >
                  <option value="">All Stock</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Unlimited">Unlimited</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <th
                            key={header.id}
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <div className="flex items-center">
                              {flexRender(
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
                  <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-4 py-6 text-center"
                        >
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#663399]"></div>
                          </div>
                        </td>
                      </tr>
                    ) : table.getRowModel().rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="px-4 py-6 text-center text-gray-500"
                        >
                          No products found
                        </td>
                      </tr>
                    ) : (
                      table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="px-4 py-4 whitespace-nowrap"
                            >
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
            </div>
          </div>

          {!isLoading && (
            <div className="px-4 py-3 text-sm text-gray-600 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              Showing {table.getRowModel().rows.length} of {data.length}{" "}
              products
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
