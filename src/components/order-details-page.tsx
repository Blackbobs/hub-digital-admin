'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { OrderStatus } from '@/interface/order';
import StatusBadge from './status-badge';
import { useOrder, useUpdateOrderStatus } from '@/hooks/useOrder';


const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  // const router = useRouter();
  const { data: order, isLoading, isError } = useOrder(params.id);
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateOrderStatus();
  const [status, setStatus] = useState(order?.status || '');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading order</div>;
  if (!order) return <div>Order not found</div>;

  const handleStatusUpdate = () => {
    updateStatus({ id: params.id, status: status as OrderStatus });
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-inter">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link
                href="/orders"
                className="text-[#6a7681] text-base font-medium leading-normal hover:text-gray-800 transition-colors"
              >
                Orders
              </Link>
              <span className="text-[#6a7681] text-base font-medium leading-normal">
                /
              </span>
              <span className="text-[#121416] text-base font-medium leading-normal">
                Order #{order._id.slice(-6)}
              </span>
            </div>

            {/* Order Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-[#6a7681] text-sm font-normal leading-normal">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <StatusBadge status={order.status} />
              </div>
            </div>

            {/* Customer Information */}
            <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Customer Information
            </h3>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dde1e3] py-5">
                <p className="text-[#6a7681] text-sm font-normal leading-normal">
                  Name
                </p>
                <p className="text-[#121416] text-sm font-normal leading-normal">
                  {order.user.name}
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dde1e3] py-5">
                <p className="text-[#6a7681] text-sm font-normal leading-normal">
                  Email
                </p>
                <p className="text-[#121416] text-sm font-normal leading-normal">
                  {order.user.email}
                </p>
              </div>
            </div>

            {/* Order Details */}
            <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Order Details
            </h3>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-xl border border-[#dde1e3] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#121416] w-[400px] text-sm font-medium leading-normal">
                        Item
                      </th>
                      <th className="px-4 py-3 text-left text-[#121416] w-[400px] text-sm font-medium leading-normal">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-[#121416] w-[400px] text-sm font-medium leading-normal">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-[#121416] w-[400px] text-sm font-medium leading-normal">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.product._id} className="border-t border-t-[#dde1e3]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#121416] text-sm font-normal leading-normal">
                          {item.product.title}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7681] text-sm font-normal leading-normal">
                          {item.quantity}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7681] text-sm font-normal leading-normal">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7681] text-sm font-normal leading-normal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-4">
              <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#6a7681] text-sm font-normal leading-normal">
                  Subtotal
                </p>
                <p className="text-[#121416] text-sm font-normal leading-normal text-right">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between gap-x-6 py-2 border-t border-t-[#dde1e3] pt-4">
                <p className="text-[#121416] text-sm font-bold leading-normal">
                  Total
                </p>
                <p className="text-[#121416] text-sm font-bold leading-normal text-right">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Order Status */}
            <h3 className="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Order Status
            </h3>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#121416] text-base font-medium leading-normal pb-2">
                  Status
                </p>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
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
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#dce8f3] text-[#13161a] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c5d7ed] transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;