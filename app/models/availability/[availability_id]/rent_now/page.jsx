"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RentTheCarNow() {
  const router = useRouter();
  const params = useParams();

  const [selectedCar, setSelectedCar] = useState(null);

  const [customer, setCustomer] = useState({
    customerName: "",
    customerMobile: "",
    customerEmail: "",
    customerGender: "",
    customerAddress: "",
    customerPAN: "",
    customerChoosenCar: "",   // Will store carId
    customerChoosenCarFrom: "",
    customerChoosenCarTo: "",
    customerImage: null,      // Will store file object
  });

  // Fetch car by ID
  useEffect(() => {
    const fetchCar = async () => {
      try {
        if (!params?.availability_id) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/single-car/${params.availability_id}`
        );

        const car = res.data[0];
        setSelectedCar(car);

        // store selected car ID into customer object
        setCustomer((prev) => ({
          ...prev,
          customerChoosenCar: car?.id || "",
        }));
      } catch (err) {
        console.error("Error fetching car:", err);
      }
    };

    fetchCar();
  }, [params]);

  // Input change handler for text, email, mobile, date, etc.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCustomer((prev) => ({
      ...prev,
      customerImage: file,
    }));
  };

  // Submit API with file upload support
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let key in customer) {
        formData.append(key, customer[key]);
      }

      await axios.post(
        `http://localhost:4407/api/v1/book-car`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/");
    } catch (err) {
      console.error("Error submitting booking:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
            Provide Documents
          </h2>

          {/* Name */}
          <label className="text-sm font-medium">Customer Name</label>
          <input
            name="customerName"
            value={customer.customerName}
            onChange={handleChange}
            required
            placeholder="Enter Your Name"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
          />

          {/* Mobile */}
          <label className="text-sm font-medium">Mobile Number</label>
          <input
            name="customerMobile"
            value={customer.customerMobile}
            onChange={handleChange}
            required
            type="tel"
            placeholder="Enter Your Number"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
          />

          {/* Email */}
          <label className="text-sm font-medium">Email Address</label>
          <input
            name="customerEmail"
            value={customer.customerEmail}
            onChange={handleChange}
            required
            type="email"
            placeholder="Enter Your Email"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
          />

          {/* Gender */}
          <label className="text-sm font-medium">Gender</label>
          <select
            name="customerGender"
            value={customer.customerGender}
            onChange={handleChange}
            required
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Address */}
          <label className="text-sm font-medium">Residential Address</label>
          <input
            name="customerAddress"
            value={customer.customerAddress}
            onChange={handleChange}
            required
            placeholder="Enter Your Address"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PAN */}
            <div>
              <label className="text-sm font-medium">PAN Card No</label>
              <input
                name="customerPAN"
                value={customer.customerPAN}
                onChange={handleChange}
                placeholder="ABCDE1234F"
                pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
              />
            </div>

            {/* Car Name */}
            <div>
              <label className="text-sm font-medium">Car Name</label>
              <input
                value={selectedCar?.carName || ""}
                readOnly
                className="w-full mt-1 mb-4 px-3 py-2 bg-black/10 border border-white/10 rounded-lg text-gray-200"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Choosing Car From</label>
              <input
                type="date"
                name="customerChoosenCarFrom"
                value={customer.customerChoosenCarFrom}
                onChange={handleChange}
                className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Choosing Car To</label>
              <input
                type="date"
                name="customerChoosenCarTo"
                value={customer.customerChoosenCarTo}
                onChange={handleChange}
                className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
              />
            </div>
          </div>

          {/* Customer Photo */}
          <div className="mt-2">
            <label className="text-sm font-medium">Customer Photo</label>
            <input
              type="file"
              name="customerImage"
              onChange={handleFileChange}
              className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-lg"
          >
            Submit Form
          </Button>
        </form>

        {/* CAR PREVIEW */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-4">
            YOU CHOOSEN
            <span className="ml-2 text-yellow-400">
              {selectedCar?.carName || "—"}
            </span>
          </h3>

          {selectedCar?.carImageMain ? (
            <img
              src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${selectedCar.carImageMain}`}
              className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10"
            />
          ) : (
            <div className="w-full max-w-md h-56 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-gray-400">
              Loading image...
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
