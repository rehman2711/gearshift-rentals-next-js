"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RentNow = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const [customer, setCustomer] = useState({
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

  const fetchCars = async () => {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/all-cars`);
    setCars(result.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarChange = (e) => {
    const carId = e.target.value;

    setCustomer((prev) => ({
      ...prev,
      customerChoosenCar: carId,
    }));

    const foundCar = cars.find((car) => String(car.id) === String(carId));
    setSelectedCar(foundCar || null);
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setCustomer((prev) => ({
      ...prev,
      customerImage: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in customer) formData.append(key, customer[key]);

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/book-car`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

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
    <div className="min-h-screen w-full bg-gradient-to-r from-[#ffd6ff] via-[#ffd6ff]/30 to-transparent backdrop-blur-lg py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl space-y-10"
        >
          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
            Rent a Car — Premium Service
          </h2>

          {/* ========================= SECTION 1: Personal Info ========================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT SIDE - PERSONAL DETAILS */}
            <div className="space-y-6">

              <div className="p-5 bg-white/70 rounded-xl shadow-lg space-y-4">
                <h3 className="text-xl font-semibold text-black mb-2">Personal Details</h3>

                <div>
                  <Label>Customer Name</Label>
                  <Input
                    type="text"
                    name="customerName"
                    value={customer.customerName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label>Mobile Number</Label>
                  <Input
                    type="number"
                    name="customerMobile"
                    value={customer.customerMobile}
                    onChange={handleChange}
                    placeholder="Enter your number"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="customerEmail"
                    value={customer.customerEmail}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label>Gender</Label>
                  <select
                    name="customerGender"
                    value={customer.customerGender}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <Label>Residential Address</Label>
                  <Input
                    type="text"
                    name="customerAddress"
                    value={customer.customerAddress}
                    onChange={handleChange}
                    placeholder="Enter Address"
                  />
                </div>

                <div>
                  <Label>PAN Card Number</Label>
                  <Input
                    type="text"
                    name="customerPAN"
                    value={customer.customerPAN}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                  />
                </div>

                <div>
                  <Label>Upload Photo</Label>
                  <Input type="file" name="customerImage" onChange={handleFileChange} />
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — CAR PREVIEW (SCROLLABLE) */}
            <div className="p-5 bg-white/70 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-black mb-4">Car Preview</h3>

              <div className="h-[420px] overflow-y-auto rounded-xl border p-4 bg-white shadow-inner">
                {selectedCar ? (
                  <>
                    <h4 className="text-lg font-semibold mb-2">
                      Selected: <span className="text-yellow-500">{selectedCar.carName}</span>
                    </h4>

                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${selectedCar.carImageMain}`}
                      className="w-full rounded-xl shadow-lg mb-4"
                      alt="Car"
                    />

                    <p className="text-sm text-gray-700">
                      More details can be auto-filled here...
                    </p>
                  </>
                ) : (
                  <div className="text-center mt-10 opacity-50 text-black text-lg">
                    Select a car to preview...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ========================= SECTION 2: Car Selection ========================= */}
          <div className="p-6 bg-white/70 rounded-xl shadow-lg space-y-4">
            <h3 className="text-xl font-semibold text-black">Car Booking Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Choose Car</Label>
                <select
                  name="customerChoosenCar"
                  value={customer.customerChoosenCar}
                  onChange={handleCarChange}
                  className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="">Select Car</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.carName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Choose From Date</Label>
                <Input
                  type="date"
                  name="customerChoosenCarFrom"
                  value={customer.customerChoosenCarFrom}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Choose To Date</Label>
                <Input
                  type="date"
                  name="customerChoosenCarTo"
                  value={customer.customerChoosenCarTo}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg rounded-xl shadow-lg"
          >
            Submit Booking
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RentNow;
