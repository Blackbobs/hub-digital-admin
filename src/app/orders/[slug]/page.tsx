'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { OrderStatus } from '@/interface/order';
import { useOrder, useUpdateOrderStatus } from '@/hooks/useOrder';
import StatusBadge from '@/components/status-badge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const { slug } = use(params);
  const { data: order, isLoading, isError } = useOrder(slug);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();
  const [status, setStatus] = useState(order?.status || '');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading order</div>;
  if (!order) return <div>Order not found</div>;

  const handleStatusUpdate = () => {
    updateStatus({ id: slug, status: status as OrderStatus });
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-inter">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link href="/orders" className="text-[#6a7681] text-base font-medium hover:text-gray-800 transition-colors">
                Orders
              </Link>
              <span className="text-[#6a7681] text-base font-medium">/</span>
              <span className="text-[#121416] text-base font-medium">
                Order #{order?._id?.slice(-6)}
              </span>
            </div>

            {/* Order Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#121416] tracking-light text-[32px] font-bold">
                  Order #{order?._id?.slice(-6)}
                </p>
                <p className="text-[#6a7681] text-sm">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <StatusBadge status={order.status} />
              </div>
            </div>

            {/* Customer Info */}
            <h3 className="text-[#121416] text-lg font-bold px-4 pb-2 pt-4">Customer Information</h3>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dde1e3] py-5">
                <p className="text-[#6a7681] text-sm">Name</p>
                <p className="text-[#121416] text-sm">{order?.user?.username}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dde1e3] py-5">
                <p className="text-[#6a7681] text-sm">Email</p>
                <p className="text-[#121416] text-sm">{order?.user?.email}</p>
              </div>
            </div>

            {/* Order Details */}
            <h3 className="text-[#121416] text-lg font-bold px-4 pb-2 pt-4">Order Details</h3>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#dde1e3] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-sm font-medium w-[400px]">Item</th>
                      <th className="px-4 py-3 text-left text-sm font-medium w-[400px]">Quantity</th>
                      <th className="px-4 py-3 text-left text-sm font-medium w-[400px]">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium w-[400px]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.items?.map((item) => (
                      <tr key={item?.product?._id} className="border-t border-t-[#dde1e3]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-sm">{item?.product?.title}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-sm">{item?.quantity}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-sm">${item?.price?.toFixed(2)}</td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-sm">${(item?.price * item?.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4">
              <div className="flex justify-between py-2">
                <p className="text-[#6a7681] text-sm">Subtotal</p>
                <p className="text-[#121416] text-sm">${order?.totalAmount?.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-t border-t-[#dde1e3] pt-4 py-2">
                <p className="text-[#121416] text-sm font-bold">Total</p>
                <p className="text-[#121416] text-sm font-bold">${order?.totalAmount?.toFixed(2)}</p>
              </div>
            </div>

            {/* Order Status */}
            <h3 className="text-[#121416] text-lg font-bold px-4 pb-2 pt-4">Order Status</h3>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium pb-2">Status</p>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-input flex w-full rounded-xl border border-[#dde1e3] h-14 px-4"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
            </div>

            <div className="flex px-4 py-3 justify-end">
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdating}
                className="rounded-xl h-10 px-4 bg-[#dce8f3] text-sm font-bold hover:bg-[#c5d7ed] transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
