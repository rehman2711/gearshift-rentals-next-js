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

  if (showLoader) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 px-2 sm:px-0">
      {/* PAGE TITLE */}
      <div
        className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 rounded-xl shadow-lg px-4 sm:px-6 py-4"
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
        <h1 className="text-black text-2xl sm:text-3xl mx-auto font-bold tracking-wide text-center sm:text-left w-full sm:w-auto dark:text-white">
          Dashboard
        </h1>

        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="bg-yellow-400/50 hover:bg-yellow-500/50 w-full sm:w-auto"
        >
          Back
        </Button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white rounded-xl p-5 sm:p-6 shadow-md">
          <h5 className="text-base sm:text-lg font-medium opacity-90">
            Total Cars
          </h5>
          <p className="text-3xl sm:text-4xl font-bold mt-2">150</p>
        </div>

        <div className="bg-green-500 text-white rounded-xl p-5 sm:p-6 shadow-md">
          <h5 className="text-base sm:text-lg font-medium opacity-90">
            Available Cars
          </h5>
          <p className="text-3xl sm:text-4xl font-bold mt-2">120</p>
        </div>

        <div className="bg-red-500 text-white rounded-xl p-5 sm:p-6 shadow-md">
          <h5 className="text-base sm:text-lg font-medium opacity-90">
            Booked Cars
          </h5>
          <p className="text-3xl sm:text-4xl font-bold mt-2">30</p>
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="space-y-4">
        <h4 className="text-xl sm:text-2xl font-semibold">
          Recent Bookings
        </h4>

        <div className="overflow-x-auto rounded-xl shadow-md border bg-white">
          <table className="min-w-full text-left dark:bg-black/90">
            <thead className="bg-gray-100 border-b dark:bg-black/70">
              <tr>
                {["Booking ID", "Car Model", "Customer", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-gray-600  dark:text-white"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y text-sm sm:text-base">
              {[
                ["#001", "Toyota Corolla", "John Doe", "Confirmed", "green"],
                ["#002", "Honda Civic", "Jane Smith", "Pending", "yellow"],
                ["#003", "Ford Focus", "Mike Johnson", "Cancelled", "red"],
              ].map(([id, car, name, status, color]) => (
                <tr key={id}>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">{id}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">{car}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">{name}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span
                      className={`px-3 py-1 text-sm bg-${color}-100 text-${color}-700 rounded-full`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="space-y-4">
        <h4 className="text-xl sm:text-2xl font-semibold">Quick Links</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
