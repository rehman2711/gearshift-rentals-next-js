"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RentTheCarNow() {
  const router = useRouter();
  const params = useParams(); // expects { choosen_id: '...' }

  const [selectedCar, setSelectedCar] = useState(null);

  const [customer, setCustomer] = useState({
    image: "/images/form-images/defaultAvatar.jpg",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    address: "",
    licence: "",
    cName: "",
  });

  // Fetch single car by id (choosen_id)
  useEffect(() => {
    const fetchCar = async () => {
      try {
        if (!params?.availability_id) return;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/single-car/${params.availability_id}`
        );
        setSelectedCar(res.data[0] || null);
        // console.log(res.data[0] || null);

        // prefills car name into customer object
        setCustomer((prev) => ({ ...prev, carName: res.data?.carName || "" }));
      } catch (err) {
        console.error("Error fetching car:", err);
      }
    };

    fetchCar();
  }, [params]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // when user types other fields, keep cName from selectedCar
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
      image: "/images/form-images/defaultAvatar.jpg",
      carName: selectedCar?.carName || prev.carName,
    }));
  };

  // Submit form -> POST booking and navigate home
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, customer);
      // optionally show a toast or success UI here
      router.push("/");
    } catch (err) {
      console.error("Error submitting booking:", err);
      // optionally show an error UI
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
            Provide Documents
          </h2>

          {/* Customer Name */}
          <label className="text-sm font-medium">Customer Name</label>
          <input
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            placeholder="Enter Your Name"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Mobile */}
          <label className="text-sm font-medium">Mobile Number</label>
          <input
            name="mobile"
            value={customer.mobile}
            onChange={handleChange}
            required
            placeholder="Enter Your Number"
            type="tel"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Email */}
          <label className="text-sm font-medium">Email Address</label>
          <input
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
            placeholder="Enter Your Email"
            type="email"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          />

          {/* Gender */}
          <label className="text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={customer.gender}
            onChange={handleChange}
            required
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Address */}
          <label className="text-sm font-medium">Residential Address</label>
          <input
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
            placeholder="Enter Your Address"
            className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Licence */}
            <div>
              <label className="text-sm font-medium">Driving Licence</label>
              <input
                name="licence"
                value={customer.licence}
                onChange={handleChange}
                placeholder="ABCDE1234F"
                pattern="^[A-Z]{5}[0-9]{4}[A-Z]{1}$"
                className="w-full mt-1 mb-4 px-3 py-2 bg-black/20 border border-white/20 rounded-lg outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <p className="text-xs text-gray-400">Format: ABCDE1234F</p>
            </div>

            {/* Car name (read only) */}
            <div>
              <label className="text-sm font-medium">Car Name</label>
              <input
                name="cName"
                value={selectedCar?.carName || ""}
                readOnly
                className="w-full mt-1 mb-4 px-3 py-2 bg-black/10 border border-white/10 rounded-lg text-gray-200"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 transition text-black font-semibold py-3 rounded-lg shadow-lg"
          >
            Submit Form
          </Button>
        </form>

        {/* PREVIEW */}
        <div className="my-auto">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-semibold mb-4">
              YOU CHOOSEN
              <span className="ml-2 text-yellow-400">
                {selectedCar?.carName || " — "}
              </span>
            </h3>

            {selectedCar?.carImageMain ? (
              // use next/image if you move to an actual page file; keeping img for simplicity
              <img
                src={
                  process.env.NEXT_PUBLIC_IMAGE_PATH +
                  "/" +
                  selectedCar.carImageMain
                }
                alt={selectedCar.carName}
                className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10"
              />
            ) : (
              <div className="w-full max-w-md h-56 rounded-2xl bg-white/3 border border-white/6 flex items-center justify-center text-gray-400">
                Loading image...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
