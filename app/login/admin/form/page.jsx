"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/app/loader";
import toast from "react-hot-toast";

const FormCar = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  /* ---------------- HANDLER ---------------- */
  const updateValue = (e) => {
    const { name, value, files } = e.target;
    setCarInfo((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateStep1 = () => {
    const err = {};
    [
      "carName",
      "carBrandName",
      "carModelName",
      "carSlogan",
      "carManufactureYear",
      "carStatus",
      "carAvailableDate",
      "carDescription",
    ].forEach((field) => {
      if (!carInfo[field]) err[field] = "Required";
    });

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep2 = () => {
    const err = {};
    [
      "carCurrency",
      "carRent",
      "carMileage",
      "carFuelType",
      "carGearSystem",
      "carSeatingCapacity",
      "carStorageCapacity",
    ].forEach((field) => {
      if (!carInfo[field]) err[field] = "Required";
    });

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep3 = () => {
    const err = {};
    ["carImageMain", "carImageSub1", "carImageSub2", "carImageSub3"].forEach(
      (field) => {
        if (!carInfo[field]) err[field] = "Required";
      }
    );

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const submitForm = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      if (!validateStep3()) return;

      const formData = new FormData();
      Object.entries(carInfo).forEach(([key, val]) =>
        formData.append(key, val)
      );

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/insert-car`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (error) {
      console.log("Error while creating cars", error);
    } finally {
      setIsLoading(false);
      // toaster
      toast.success("Car Data Added Successfully.", {
        duration: 10000, // 10 seconds
        style: {
          border: "1px solid rgb(22, 163, 74)", // green-600
          padding: "10px",
          color: "#065f46", // emerald-800
          background: "#ecfdf5", // green-50
        },
        iconTheme: {
          primary: "#16a34a",
          secondary: "#ecfdf5",
        },
      });
      router.replace("/login/admin/manage_data");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      {/* HEADER */}
      <div
        className="flex items-center justify-between rounded-xl shadow-lg border-t px-6 py-4"
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
        <h1 className="text-black text-3xl font-bold tracking-wide mx-auto dark:text-white ">
          CAR INFORMATION FORM
        </h1>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="bg-yellow-400/50 hover:bg-yellow-500/50"
        >
          Back
        </Button>
      </div>

      <form
        onSubmit={submitForm}
        className="max-w-7xl mx-auto mt-10 bg-white/70 backdrop-blur-xl border rounded-3xl shadow-2xl p-10 space-y-10 dark:bg-black/50 dark:text-white"
      >
        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Basic Car Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ["Car Name", "carName"],
                ["Brand", "carBrandName"],
                ["Model", "carModelName"],
                ["Manufacture Year", "carManufactureYear"],
              ].map(([label, name]) => (
                <div key={name}>
                  <Label className="mb-2 ms-1">{label}</Label>
                  <Input
                    name={name}
                    placeholder={label}
                    onChange={updateValue}
                    className="!placeholder:text-sm"
                  />
                  {errors[name] && (
                    <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <Label className="mb-2 ms-1">Car Status</Label>
                <select
                  name="carStatus"
                  onChange={updateValue}
                  className="border rounded-lg p-1.5 text-sm w-full dark:bg-black/90"
                >
                  <option value="">Select Status</option>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
                {errors.carStatus && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.carStatus}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 ms-1">Car Available Date</Label>
                <Input
                  type="date"
                  name="carAvailableDate"
                  onChange={updateValue}
                  className="placeholder:text-sm"
                />
                {errors.carAvailableDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.carAvailableDate}
                  </p>
                )}
              </div>

              <div className="md:col-span-1">
                <Label className="mb-2 ms-1">Slogan</Label>
                <textarea
                  name="carSlogan"
                  placeholder="Car Slogan"
                  onChange={updateValue}
                  className="border rounded-lg p-3 w-full h-32 placeholder:text-sm"
                />
                {errors.carSlogan && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.carSlogan}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label className="mb-2 ms-1">Car Description</Label>
                <textarea
                  name="carDescription"
                  placeholder="Car Description"
                  onChange={updateValue}
                  className="border rounded-lg p-3 w-full h-32 placeholder:text-sm"
                />
                {errors.carDescription && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.carDescription}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="button"
              onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-yellow-400/90 text-black hover:bg-yellow-400/70"
            >
              Continue
            </Button>
          </section>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Pricing & Specifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                ["Mileage", "carMileage"],
                ["Gear System", "carGearSystem"],
                ["Seating Capacity", "carSeatingCapacity"],
                ["Storage Capacity", "carStorageCapacity"],
                ["Fuel Type", "carFuelType"],
                ["Rent Amount", "carRent"],
              ].map(([label, name]) => (
                <div key={name}>
                  <Label className="mb-2 ms-1">{label}</Label>
                  <Input
                    name={name}
                    placeholder={label}
                    onChange={updateValue}
                    className="placeholder:text-sm"
                  />
                  {errors[name] && (
                    <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <Label className="mb-2 ms-1">Select Currency</Label>
                <select
                  name="carCurrency"
                  onChange={updateValue}
                  className="border rounded-lg p-2 text-sm w-full rounded-md dark:bg-black/90"
                >
                  <option value="">Select Currency</option>
                  <option value="RUPEES">RUPEES</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                </select>
                {errors.carCurrency && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.carCurrency}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                type="button"
                onClick={() => validateStep2() && setStep(3)}
                className="bg-yellow-400/90 text-black hover:bg-yellow-400/70"
              >
                Continue
              </Button>
            </div>
          </section>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Car Images</h2>

            {/* Two-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["Main Image", "carImageMain"],
                ["Sub Image 1", "carImageSub1"],
                ["Sub Image 2", "carImageSub2"],
                ["Sub Image 3", "carImageSub3"],
              ].map(([label, name]) => (
                <div key={name} className="space-y-2">
                  <Label className="mb-2 ms-1">{label}</Label>
                  <Input
                    type="file"
                    name={name}
                    accept="image/*"
                    onChange={(e) => {
                      updateValue(e);

                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview((prev) => ({
                          ...prev,
                          [name]: URL.createObjectURL(file),
                        }));
                      }
                    }}
                  />

                  {/* Image Preview */}
                  {preview?.[name] && (
                    <img
                      src={preview[name]}
                      alt={name}
                      className="w-full max-w-xs h-40 object-cover rounded-lg border"
                    />
                  )}

                  {/* Validation Error */}
                  {errors[name] && (
                    <p className="text-xs text-red-500">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                type="submit"
                className="bg-yellow-400/90 text-black hover:bg-yellow-400/70"
              >
                Submit Details
              </Button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default FormCar;
