"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Loader from "@/app/loader";

export default function AdminDashboard() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* PAGE TITLE */}
      <div
        className="flex items-center justify-between rounded-xl shadow-lg px-6 py-4"
        style={{
          backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px),
        radial-gradient(circle 500px at 50% 100px, rgba(245, 237, 14, 0.4), transparent)
      `,
        }}
      >
        <h1 className="text-black mx-auto text-3xl font-bold tracking-wide">
          Dashboard
        </h1>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="bg-yellow-400/50 hover:bg-yellow-500/50"
        >
          Back
        </Button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white rounded-xl p-6 shadow-md">
          <h5 className="text-lg font-medium opacity-90">Total Cars</h5>
          <p className="text-4xl font-bold mt-2">150</p>
        </div>

        <div className="bg-green-500 text-white rounded-xl p-6 shadow-md">
          <h5 className="text-lg font-medium opacity-90">Available Cars</h5>
          <p className="text-4xl font-bold mt-2">120</p>
        </div>

        <div className="bg-red-500 text-white rounded-xl p-6 shadow-md">
          <h5 className="text-lg font-medium opacity-90">Booked Cars</h5>
          <p className="text-4xl font-bold mt-2">30</p>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="space-y-4">
        <h4 className="text-2xl font-semibold">Recent Bookings</h4>

        <div className="overflow-x-auto rounded-xl shadow-md border bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Booking ID
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Car Model
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              <tr>
                <td className="px-6 py-4">#001</td>
                <td className="px-6 py-4">Toyota Corolla</td>
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                    Confirmed
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4">#002</td>
                <td className="px-6 py-4">Honda Civic</td>
                <td className="px-6 py-4">Jane Smith</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4">#003</td>
                <td className="px-6 py-4">Ford Focus</td>
                <td className="px-6 py-4">Mike Johnson</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                    Cancelled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="space-y-4">
        <h4 className="text-2xl font-semibold">Quick Links</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/login/admin/form"
            className="bg-blue-600 text-white text-center py-4 rounded-xl shadow hover:bg-blue-700 transition font-medium"
          >
            Add New Car
          </Link>

          <Link
            href="/login/admin/view_bookings"
            className="bg-yellow-400 text-black text-center py-4 rounded-xl shadow hover:bg-yellow-300 transition font-medium"
          >
            View Bookings
          </Link>

          <Link
            href="/login/admin/completed_bookings"
            className="bg-green-600 text-white text-center py-4 rounded-xl shadow hover:bg-green-700 transition font-medium"
          >
            Completed Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
