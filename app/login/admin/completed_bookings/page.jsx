"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/app/loader";

const ViewBookings = () => {
  const [viewCustomerBookings, setViewCustomerBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fetchCustomer = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings_completed`
      );
      setViewCustomerBookings(result.data);
      console.log(result.data);
    } catch (error) {
      console.log("Error While Getting Completed Bookings" + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
          <h1 className="text-black text-3xl font-bold tracking-wide mx-auto">
            ALL APPROVED BOOKINGS
          </h1>
          <Button
            variant="secondary"
            onClick={() => router.back()}
            className="bg-yellow-400/50 hover:bg-yellow-500/50"
          >
            Back
          </Button>
        </div>

        {/* Bookings Grid */}
        <div className="mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {viewCustomerBookings.map((val, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-3xl p-5 border border-gray-200 hover:shadow-xl transition"
            >
              <div className="text-center">
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${val.customerImage}`}
                  alt="Customer"
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-3"
                />

                <h4 className="text-xl font-semibold text-blue-600 mb-3">
                  {val.customerName}
                </h4>

                <div className="text-left text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Mobile:</span>{" "}
                    {val.customerMobile}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {val.customerEmail}
                  </p>
                  <p>
                    <span className="font-semibold">Gender:</span>{" "}
                    {val.customerGender}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {val.customerAddress}
                  </p>
                  <p>
                    <span className="font-semibold">PAN no:</span>{" "}
                    {val.customerPAN}
                  </p>
                  <p>
                    <span className="font-semibold">Booked Car:</span>{" "}
                    {val.customerChoosenCar}
                  </p>
                  <p>
                    <span className="font-semibold">Booked From:</span>{" "}
                    {new Date(val.customerChoosenCarFrom).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </p>
                  <p>
                    <span className="font-semibold">Booked To:</span>{" "}
                    {new Date(val.customerChoosenCarTo).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-center"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewBookings;
