"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Container from "@/app/components/Container";

const FormCar = () => {
  const router = useRouter();

  const [carInfo, setCarInfo] = useState({
    carName: "",
    carBrandName: "",
    carModelName: "",
    carSlogan: "",
    carDescription: "",
    carCurrency: "",
    carFuelType: "",
    carGearSystem: "",
    carManufactureYear: "",
    carMileage: "",
    carRent: "",
    carSeatingCapacity: "",
    carStorageCapacity: "",
    carImageMain: "",
    carImageSub1: "",
    carImageSub2: "",
    carImageSub3: "",
    carStatus: "",
    carAvailableDate: "",
  });

  const updateValue = (e) => {
    const { name, value, files } = e.target;
    setCarInfo((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(carInfo).forEach(([key, val]) => formData.append(key, val));

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cars`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    router.push("/login/admin/managedata");
  };

  return (
    <Container>
      <form onSubmit={submitForm}>
        <div className="p-2 bg-yellow-400 flex justify-between items-center rounded-xl shadow-lg">
          <h1 className="text-white text-3xl font-bold mx-auto">
            CAR INFORMATION FORM
          </h1>
          <Button onClick={() => router.back()}>Back</Button>
        </div>

        <div className="max-w-7xl mx-auto px-6">

          {/* BASIC DETAILS */}
          <h2 className="text-xl font-bold my-4">Basic Car Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Input name="carName" placeholder="Car Name"
              value={carInfo.carName} onChange={updateValue} />

            <Input name="carBrandName" placeholder="Car Brand"
              value={carInfo.carBrandName} onChange={updateValue} />

            <Input name="carModelName" placeholder="Car Model"
              value={carInfo.carModelName} onChange={updateValue} />

            <Input name="carSlogan" placeholder="Car Slogan"
              value={carInfo.carSlogan} onChange={updateValue} />

            <Input name="carManufactureYear" placeholder="Manufacture Year"
              value={carInfo.carManufactureYear} onChange={updateValue} />

            <select name="carStatus" value={carInfo.carStatus} onChange={updateValue}
              className="border rounded p-3">
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>

            <Input type="date" name="carAvailableDate"
              value={carInfo.carAvailableDate}
              onChange={updateValue}
              className="border rounded p-3"
            />

            <textarea
              name="carDescription"
              value={carInfo.carDescription}
              placeholder="Car Description"
              onChange={updateValue}
              className="border rounded p-3 w-full md:col-span-3 h-32"
            />
          </div>

          {/* PRICING */}
          <h2 className="text-xl font-bold mt-10 mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <select name="carCurrency" value={carInfo.carCurrency} onChange={updateValue}
              className="border rounded p-3">
              <option value="">Select Currency</option>
              <option value="RUPEES">RUPEES</option>
              <option value="USD">USD</option>
              <option value="AED">AED</option>
            </select>

            <Input type="number" name="carRent" placeholder="Rent Amount"
              value={carInfo.carRent} onChange={updateValue} />

          </div>

          {/* FEATURES */}
          <h2 className="text-xl font-bold mt-10 mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <Input name="carMileage" placeholder="Mileage"
              value={carInfo.carMileage} onChange={updateValue} />

            <Input name="carGearSystem" placeholder="Gear System"
              value={carInfo.carGearSystem} onChange={updateValue} />

            <Input name="carSeatingCapacity" placeholder="Seating Capacity"
              value={carInfo.carSeatingCapacity} onChange={updateValue} />

            <Input name="carStorageCapacity" placeholder="Storage Capacity"
              value={carInfo.carStorageCapacity} onChange={updateValue} />

            <Input name="carFuelType" placeholder="Fuel Type"
              value={carInfo.carFuelType} onChange={updateValue} />

          </div>

          {/* IMAGES */}
          <h2 className="text-xl font-bold mt-10 mb-4">Car Images</h2>

          <Label>Main Image</Label>
          <Input type="file" name="carImageMain" onChange={updateValue} className="mb-3" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input type="file" name="carImageSub1" onChange={updateValue} />
            <Input type="file" name="carImageSub2" onChange={updateValue} />
            <Input type="file" name="carImageSub3" onChange={updateValue} />
          </div>

          <div className="text-center my-10">
            <Button type="submit" className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold">
              Submit Details
            </Button>
          </div>

        </div>
      </form>
    </Container>
  );
};

export default FormCar;