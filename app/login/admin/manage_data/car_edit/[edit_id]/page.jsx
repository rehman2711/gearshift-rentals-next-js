"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminCarEdit = () => {
  const { edit_id } = useParams();
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

  const [preview, setPreview] = useState({
    carImageMain: "",
    carImageSub1: "",
    carImageSub2: "",
    carImageSub3: "",
  });

  console.log(preview)

  // FETCH CAR DATA
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/single-car/${edit_id}`
      );

      setCarInfo(res.data[0]);
      console.log(res.data[0]);

      setPreview({
        carImageMain: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${res.data[0].carImageMain}`,
        carImageSub1: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${res.data[0].carImageSub1}`,
        carImageSub2: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${res.data[0].carImageSub2}`,
        carImageSub3: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${res.data[0].carImageSub3}`,
      });
    };

    fetchData();
  }, [edit_id]);

  // HANDLE INPUTS
  const updateValue = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setCarInfo((prev) => ({ ...prev, [name]: files[0] }));
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    } else {
      setCarInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  // SUBMIT FORM
  const updateInformation = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(carInfo).forEach(([k, v]) => fd.append(k, v));

    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/edit-car/${edit_id}`,
      fd,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    router.push("/login/admin/manage_data");
  };

  return (
    <form onSubmit={updateInformation}>
      <div className="bg-yellow-500 my-5 rounded-xl">
        <h1 className="text-white py-6 text-center text-4xl font-extrabold">
          EDIT CAR INFORMATION
        </h1>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 font-semibold">

          {/* BASIC INFO */}
          <h2 className="col-span-12 text-2xl mt-4 mb-2">
            Basic Car Information
          </h2>

          <div className="col-span-12 md:col-span-4">
            <Label>Car Name</Label>
            <Input name="carName" value={carInfo.carName} onChange={updateValue} />
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label>Brand</Label>
            <Input name="carBrandName" value={carInfo.carBrandName} onChange={updateValue} />
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label>Model</Label>
            <Input name="carModelName" value={carInfo.carModelName} onChange={updateValue} />
          </div>

          <div className="col-span-12 md:col-span-6">
            <Label>Slogan</Label>
            <Input name="carSlogan" value={carInfo.carSlogan} onChange={updateValue} />
          </div>

          <div className="col-span-12 md:col-span-6">
            <Label>Manufacture Year</Label>
            <Input name="carManufactureYear" value={carInfo.carManufactureYear} onChange={updateValue} />
          </div>

          <div className="col-span-12">
            <Label>Description</Label>
            <textarea
              name="carDescription"
              value={carInfo.carDescription}
              onChange={updateValue}
              className="border rounded p-2 w-full h-32"
            />
          </div>

          {/* STATUS */}
          <div className="col-span-12 md:col-span-4">
            <Label>Status</Label>
            <select
              name="carStatus"
              value={carInfo.carStatus}
              onChange={updateValue}
              className="border rounded w-full p-2"
            >
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label>Available Date</Label>
            <Input type="date" name="carAvailableDate" value={carInfo.carAvailableDate} onChange={updateValue} />
          </div>

          {/* PRICING */}
          <h2 className="col-span-12 text-2xl mt-6 mb-2">Pricing</h2>

          <div className="col-span-12 md:col-span-4">
            <Label>Currency</Label>
            <select name="carCurrency" value={carInfo.carCurrency} onChange={updateValue} className="border rounded p-2 w-full">
              <option value="">Select</option>
              <option value="RUPEES">RUPEES</option>
              <option value="USD">USD</option>
              <option value="AED">AED</option>
            </select>
          </div>

          <div className="col-span-12 md:col-span-4">
            <Label>Car Rent</Label>
            <Input type="number" name="carRent" value={carInfo.carRent} onChange={updateValue} />
          </div>

          {/* CAR FEATURES */}
          <h2 className="col-span-12 text-2xl mt-6 mb-2">Car Features</h2>

          <div className="col-span-12 md:col-span-3">
            <Label>Mileage</Label>
            <Input name="carMileage" value={carInfo.carMileage} onChange={updateValue} />
          </div>

          <div className="col-span-12 md:col-span-3">
            <Label>Gear System</Label>
            <Input name="carGearSystem" value={carInfo.carGearSystem} onChange={updateValue} />
          </div>

          <div className="col-span-12 md:col-span-3">
            <Label>Seating Capacity</Label>
            <Input name="carSeatingCapacity" value={carInfo.carSeatingCapacity} onChange={updateValue} />
          </div>

          <div className="col-span-12 md:col-span-3">
            <Label>Storage Capacity</Label>
            <Input name="carStorageCapacity" value={carInfo.carStorageCapacity} onChange={updateValue} />
          </div>

          {/* IMAGES */}
          <h2 className="col-span-12 text-2xl mt-6 mb-2">Car Images</h2>

          {/* MAIN IMAGE */}
          <div className="col-span-12 md:col-span-6">
            <Label>Main Image</Label>
            <Input type="file" name="carImageMain" onChange={updateValue} />

            {preview.carImageMain && (
              <img src={preview.carImageMain} className="mt-3 rounded-lg" width="200" />
            )}
          </div>

          {/* OTHER IMAGES */}
          {["carImageSub1", "carImageSub2", "carImageSub3"].map((key, i) => (
            <div key={key} className="col-span-12 md:col-span-4">
              <Label>Image {i + 1}</Label>
              <Input type="file" name={key} onChange={updateValue} />

              {preview[key] && (
                <img src={preview[key]} className="mt-3 rounded-lg" width="200" />
              )}
            </div>
          ))}

          {/* SUBMIT */}
          <div className="col-span-12 text-center mt-10 mb-6">
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold"
            >
              Save Changes
            </Button>
          </div>

        </div>
      </div>
    </form>
  );
};

export default AdminCarEdit;