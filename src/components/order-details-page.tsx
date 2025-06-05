'use client'
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const OrderDetailsPage = () => {
  const [orderStatus, setOrderStatus] = useState("processing");

  // Sample order data
  const orderData = {
    orderNumber: "12345",
    placedDate: "July 15, 2024",
    customer: {
      name: "Sophia Clark",
      email: "sophia.clark@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Anytown, USA",
    },
    items: [
      {
        id: 1,
        name: "Product A",
        quantity: 2,
        price: 25.0,
        total: 50.0,
      },
      {
        id: 2,
        name: "Product B",
        quantity: 1,
        price: 40.0,
        total: 40.0,
      },
    ],
    pricing: {
      subtotal: 90.0,
      shipping: 5.0,
      tax: 4.5,
      total: 99.5,
    },
  };

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleStatusUpdate = () => {
    // Handle status update logic here
    alert(
      `Order status updated to: ${
        statusOptions.find((opt) => opt.value === orderStatus)?.label
      }`
    );
  };

  const handleNotificationClick = () => {
    alert("Notifications clicked");
  };

  return (
    <>
      <Head>
        <title>Order #{orderData.orderNumber} - Dropship Central</title>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=swap&family=Inter:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900"
        />
      </Head>

      <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-inter">
        <div className="layout-container flex h-full grow flex-col">
          {/* Main Content */}
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
                  Order #{orderData.orderNumber}
                </span>
              </div>

              {/* Order Header */}
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight">
                    Order #{orderData.orderNumber}
                  </p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Placed on {orderData.placedDate}
                  </p>
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
                    {orderData.customer.name}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dde1e3] py-5">
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Email
                  </p>
                  <p className="text-[#121416] text-sm font-normal leading-normal">
                    {orderData.customer.email}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dde1e3] py-5">
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Phone
                  </p>
                  <p className="text-[#121416] text-sm font-normal leading-normal">
                    {orderData.customer.phone}
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#dde1e3] py-5">
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Address
                  </p>
                  <p className="text-[#121416] text-sm font-normal leading-normal">
                    {orderData.customer.address}
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
                      {orderData.items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-t border-t-[#dde1e3]"
                        >
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#121416] text-sm font-normal leading-normal">
                            {item.name}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7681] text-sm font-normal leading-normal">
                            {item.quantity}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7681] text-sm font-normal leading-normal">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="h-[72px] px-4 py-2 w-[400px] text-[#6a7681] text-sm font-normal leading-normal">
                            ${item.total.toFixed(2)}
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
                    ${orderData.pricing.subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between gap-x-6 py-2">
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Shipping
                  </p>
                  <p className="text-[#121416] text-sm font-normal leading-normal text-right">
                    ${orderData.pricing.shipping.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between gap-x-6 py-2">
                  <p className="text-[#6a7681] text-sm font-normal leading-normal">
                    Tax
                  </p>
                  <p className="text-[#121416] text-sm font-normal leading-normal text-right">
                    ${orderData.pricing.tax.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between gap-x-6 py-2 border-t border-t-[#dde1e3] pt-4">
                  <p className="text-[#121416] text-sm font-bold leading-normal">
                    Total
                  </p>
                  <p className="text-[#121416] text-sm font-bold leading-normal text-right">
                    ${orderData.pricing.total.toFixed(2)}
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
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border border-[#dde1e3] bg-white focus:border-[#dde1e3] h-14 placeholder:text-[#6a7681] p-[15px] text-base font-normal leading-normal"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex px-4 py-3 justify-end">
                <button
                  onClick={handleStatusUpdate}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#dce8f3] text-[#13161a] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#c5d7ed] transition-colors"
                >
                  <span className="truncate">Update Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPage;
