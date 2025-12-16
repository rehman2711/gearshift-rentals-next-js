"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "@/app/loader";

const AdminPanelIndex = () => {
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
    <>
      {/* HEADER */}
      <div className="text-center mt-10">
        <h2 className="mb-6 text-5xl font-extrabold">
          Welcome to the Admin Panel
        </h2>
      </div>

      {/* GRID CONTAINER */}
      <div className="max-w-6xl mx-auto mt-10 px-4">
        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h5 className="text-xl font-semibold mb-2">Dashboard</h5>
            <p className="text-gray-600 mb-4">
              View and manage all registered users.
            </p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => router.push("/login/admin/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>

          {/* CARD 2 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h5 className="text-xl font-semibold mb-2">Add Car For Rent</h5>
            <p className="text-gray-600 mb-4">Generate and review activity.</p>
            <button
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500"
              onClick={() => router.push("/login/admin/form")}
            >
              Add Car
            </button>
          </div>

          {/* CARD 3 */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h5 className="text-xl font-semibold mb-2">Manage Cars & Data</h5>
            <p className="text-gray-600 mb-4">
              Read user feedback and respond to inquiries.
            </p>
            <button
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              onClick={() => router.push("/login/admin/manage_data")}
            >
              Manage Data
            </button>
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {/* NOTIFICATIONS */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h5 className="text-xl font-semibold mb-2">
              View Upcoming Bookings
            </h5>
            <p className="text-gray-600 mb-4">
              Manage and send notifications to users.
            </p>
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              onClick={() => router.push("/login/admin/view_bookings")}
            >
              View Upcoming Bookings{" "}
            </button>
          </div>

          {/* ADD CAR */}
          <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h5 className="text-xl font-semibold mb-2">
              View Approved Bookings
            </h5>
            <p className="text-gray-600 mb-4">
              Track and resolve user support issues.
            </p>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => router.push("/login/admin/completed_bookings")}
            >
              View Approved Bookings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanelIndex;
