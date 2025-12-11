"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RentNow = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  // MATCHING FIRST COMPONENT FIELD NAMES
  const [customer, setCustomer] = useState({
    customerImage: null,
    customerName: "",
    customerMobile: "",
    customerEmail: "",
    customerGender: "",
    customerAddress: "",
    customerPAN: "",                       // mapped from licence
    customerChoosenCar: "",                // car ID
    customerChoosenCarFrom: "",
    customerChoosenCarTo: "",
  });

  // Fetch all cars
  const fetchCars = async () => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/all-cars`);
    setCars(result.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // When car changes → SET CAR ID (NOT carName)
  const handleCarChange = (e) => {
    const carId = e.target.value;

    setCustomer((prev) => ({
      ...prev,
      customerChoosenCar: carId,
    }));

    const foundCar = cars.find((car) => String(car.id) === String(carId));
    setSelectedCar(foundCar || null);
  };

  // Text / email / number / date changes
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // File upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCustomer((prev) => ({
      ...prev,
      customerImage: file,
    }));
  };

  // SUBMIT USING FORMDATA (MATCHING FIRST COMPONENT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in customer) {
      formData.append(key, customer[key]);
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/book-car`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // Reset form
    setCustomer({
      customerImage: null,
      customerName: "",
      customerMobile: "",
      customerEmail: "",
      customerGender: "",
      customerAddress: "",
      customerPAN: "",
      customerChoosenCar: "",
      customerChoosenCarFrom: "",
      customerChoosenCarTo: "",
    });

    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#ffd6ff] via-[#ffd6ff]/30 to-transparent backdrop-blur-lg py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* --------------------- FORM --------------------- */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
            Rent a Car — Premium Service
          </h2>

          {/* NAME */}
          <Label className="text-sm font-medium text-black px-1 mb-2">Customer Name</Label>
          <Input
            type="text"
            name="customerName"
            value={customer.customerName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mb-4"
          />

          {/* MOBILE */}
          <Label className="text-sm font-medium text-black px-1 mb-2">Mobile Number</Label>
          <Input
            type="number"
            name="customerMobile"
            value={customer.customerMobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="mb-4"
          />

          {/* EMAIL */}
          <Label className="text-sm font-medium text-black px-1 mb-2">Email Address</Label>
          <Input
            type="email"
            name="customerEmail"
            value={customer.customerEmail}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mb-4"
          />

          {/* GENDER */}
          <Label className="text-sm font-medium text-black px-1 mb-2">Gender</Label>
          <select
            name="customerGender"
            value={customer.customerGender}
            onChange={handleChange}
            className="w-full mt-1 mb-4 px-3 py-2 text-black border rounded-lg text-sm"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* ADDRESS */}
          <Label className="text-sm font-medium text-black px-1 mb-2">Residential Address</Label>
          <Input
            type="text"
            name="customerAddress"
            value={customer.customerAddress}
            onChange={handleChange}
            placeholder="Enter your address"
            className="mb-4"
          />

          {/* PAN (Mapped from Licence) */}
          <Label className="text-sm font-medium text-black px-1 mb-2">PAN Card Number</Label>
          <Input
            type="text"
            name="customerPAN"
            value={customer.customerPAN}
            onChange={handleChange}
            placeholder="ABCDE1234F"
            className="mb-4"
          />

          {/* DATES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-black px-1 mb-2">Choosing Car From</Label>
              <Input
                type="date"
                name="customerChoosenCarFrom"
                value={customer.customerChoosenCarFrom}
                onChange={handleChange}
                className="mb-4"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-black px-1 mb-2">Choosing Car To</Label>
              <Input
                type="date"
                name="customerChoosenCarTo"
                value={customer.customerChoosenCarTo}
                onChange={handleChange}
                className="mb-4"
              />
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <Label className="text-sm font-medium text-black px-1 mb-2">Customer Photo</Label>
          <Input
            type="file"
            name="customerImage"
            onChange={handleFileChange}
            className="mb-4"
          />

          {/* CAR SELECT — NOW USING CAR ID */}
          <Label className="text-sm font-medium text-black px-1 mb-2">Choose a Car</Label>
          <select
            name="customerChoosenCar"
            value={customer.customerChoosenCar}
            onChange={handleCarChange}
            className="w-full mt-1 mb-4 px-3 py-2 text-black text-sm border rounded-lg"
          >
            <option value="">Select Car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.carName}
              </option>
            ))}
          </select>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 transition text-black font-semibold py-3 rounded-lg shadow-lg"
          >
            Submit Form
          </Button>
        </form>

        {/* --------------------- CAR PREVIEW --------------------- */}
        <div className="flex flex-col items-center">
          {selectedCar ? (
            <>
              <h3 className="text-2xl font-semibold mb-3 text-black">
                You Selected:
                <span className="text-yellow-400"> {selectedCar.carName}</span>
              </h3>

              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${selectedCar.carImageMain}`}
                alt="Selected Car"
                className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10"
              />
            </>
          ) : (
            <div className="opacity-40 text-lg text-black">Select a car to preview …</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentNow;
