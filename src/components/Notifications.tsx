"use client";
import React, { useState } from "react";
import {
  ShoppingBag,
  Package,
  HelpCircle,
  Truck,
  CreditCard,
  Bell,
  Check,
  X,
} from "lucide-react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      time: "10:30 AM",
      date: "today",
      icon: ShoppingBag,
      read: false,
    },
    {
      id: 2,
      type: "inventory",
      title: "Low Stock Alert: Product X",
      time: "11:45 AM",
      date: "today",
      icon: Package,
      read: false,
    },
    {
      id: 3,
      type: "support",
      title: "Customer Inquiry: Order #12345",
      time: "12:30 PM",
      date: "today",
      icon: HelpCircle,
      read: false,
    },
    {
      id: 4,
      type: "shipping",
      title: "Order Shipped: Order #67890",
      time: "9:00 AM",
      date: "yesterday",
      icon: Truck,
      read: true,
    },
    {
      id: 5,
      type: "payment",
      title: "Payment Received: Order #11223",
      time: "3:15 PM",
      date: "yesterday",
      icon: CreditCard,
      read: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const groupedNotifications = notifications.reduce<
    Record<string, (typeof notifications)[0][]>
  >((acc, notif) => {
    if (!acc[notif.date]) {
      acc[notif.date] = [];
    }
    acc[notif.date].push(notif);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-8 h-8 text-gray-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Notifications
            </h1>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-[#663399  ] text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {Object.entries(groupedNotifications).map(([date, notifs]) => (
            <div
              key={date}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 capitalize">
                  {date}
                </h3>
              </div>

              <div className="divide-y divide-gray-100">
                {notifs.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                      style={{ borderLeftColor: "#663399" }}
                    >
                      <div
                        className={`flex items-center justify-center rounded-lg shrink-0 w-12 h-12 ${
                          !notification.read
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-base font-medium leading-normal truncate ${
                            !notification.read
                              ? "text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-sm text-gray-500 leading-normal">
                          {notification.time}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-[#663399] hover:bg-blue-100 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete notification"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-500">
              You&apos;re all caught up! New notifications will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
