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
    image: "/images/form-images/defaultAvatar.jpg",
    name: "",
    mobile: "",
    email: "",
    gender: "",
    address: "",
    licence: "",
    cName: "",
  });

  // Fetch cars
  const fetchCars = async () => {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/all-cars`
    );
    setCars(result.data);
    // console.log(result.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // When car changes
  const handleCarChange = (e) => {
    const value = e.target.value;

    setCustomer({ ...customer, cName: value });

    const carObj = cars.find((car) => car.carName === value);
    setSelectedCar(carObj || null);
  };

  // User typing
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, customer);

    // Reset form
    setCustomer({
      image: "/images/form-images/defaultAvatar.jpg",
      name: "",
      mobile: "",
      email: "",
      gender: "",
      address: "",
      licence: "",
      cName: "",
    });

    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#ffd6ff] via-{#ffd6ff}/30 to-transparent backdrop-blur-lg py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* --------- FORM CARD ---------- */}
        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-xl bg-white border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-yellow-400">
            Rent a Car — Premium Service
          </h2>

          {/* NAME */}
          <Label className="text-sm font-medium text-black px-1 mb-2 text-black px-1 mb-2">
            Customer Name
          </Label>
          <Input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mb-4"
          />

          {/* MOBILE */}
          <Label className="text-sm font-medium text-black px-1 mb-2">
            Mobile Number
          </Label>
          <Input
            type="number"
            name="mobile"
            value={customer.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            className="mb-4"
          />

          {/* EMAIL */}
          <Label className="text-sm font-medium text-black px-1 mb-2">
            Email Address
          </Label>
          <Input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mb-4"
          />

          {/* GENDER */}
          <Label className="text-sm font-medium text-black px-1 mb-2">
            Gender
          </Label>
          <select
            name="gender"
            value={customer.gender}
            onChange={handleChange}
            className="w-full mt-1 mb-4 px-3 py-2 text-black border rounded-lg text-sm"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* ADDRESS */}
          <Label className="text-sm font-medium text-black px-1 mb-2">
            Residential Address
          </Label>
          <Input
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="mb-4"
          />

          {/* LICENCE */}
          <Label className="text-sm font-medium text-black px-1 mb-2">
            Driving Licence Number
          </Label>
          <Input
            type="text"
            name="licence"
            pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}$"
            value={customer.licence}
            onChange={handleChange}
            placeholder="2ABCDE1234F"
            className="mb-2"
          />
          <p className="text-xs text-gray-400 ms-1 mb-3">Format: ABCDE1234F</p>

          {/* CAR SELECT */}
          <Label className="text-sm font-medium text-black px-1 mb-2">
            Choose a Car
          </Label>
          <select
            name="cName"
            value={customer.cName}
            onChange={handleCarChange}
            className="w-full mt-1 mb-4 px-3 py-2 text-black text-sm border rounded-lg"
          >
            <option value="">Select Car</option>
            {cars.map((car, index) => (
              <option key={index} value={car.carName}>
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

        {/* --------- CAR PREVIEW --------- */}
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
            <div className="opacity-40 text-lg text-black">
              Select a car to preview ...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentNow;
