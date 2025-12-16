"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/app/loader";

const AdminCarEdit = () => {
  const { edit_id } = useParams();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
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

  const [preview, setPreview] = useState({
    carImageMain: "",
    carImageSub1: "",
    carImageSub2: "",
    carImageSub3: "",
  });

  /* ---------------- FETCH CAR ---------------- */
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/single-car/${edit_id}`
        );

        const car = res.data[0];
        setCarInfo(car);

        setPreview({
          carImageMain: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageMain}`,
          carImageSub1: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageSub1}`,
          carImageSub2: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageSub2}`,
          carImageSub3: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageSub3}`,
        });
      } catch (error) {
        console.log("Error While Fetching Single Car Data" + error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [edit_id]);

  /* ---------------- HANDLER ---------------- */
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

  /* ---------------- VALIDATION ---------------- */
  const validateStep1 = () => {
    const err = {};
    [
      "carName",
      "carBrandName",
      "carModelName",
      "carSlogan",
      "carManufactureYear",
      "carDescription",
      "carStatus",
      "carAvailableDate",
    ].forEach((f) => {
      if (!carInfo[f]) err[f] = "Required";
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
    ].forEach((f) => {
      if (!carInfo[f]) err[f] = "Required";
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep3 = () => {
    const err = {};
    ["carImageMain", "carImageSub1", "carImageSub2", "carImageSub3"].forEach(
      (f) => {
        if (!carInfo[f]) err[f] = "Required";
      }
    );
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const updateInformation = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setIsLoading(true);

    try {
      const fd = new FormData();
      Object.entries(carInfo).forEach(([k, v]) => fd.append(k, v));

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/edit-car/${edit_id}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      router.replace("/login/admin/manage_data");
    } catch (error) {
      console.log("Error While Updating Information" + error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER */}
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
        <h1 className="text-black mx-auto text-3xl font-bold tracking-wide">
          EDIT CAR INFORMATION
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
        onSubmit={updateInformation}
        className="max-w-7xl mx-auto mt-10 bg-white/70 backdrop-blur-xl border rounded-3xl shadow-2xl p-10 space-y-10"
      >
        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Basic Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                ["carName", "Car Name"],
                ["carBrandName", "Brand"],
                ["carModelName", "Model"],
                ["carSlogan", "Slogan"],
                ["carManufactureYear", "Manufacture Year"],
              ].map(([name, label]) => (
                <div key={name}>
                  <Label className="mb-2 ms-1">{label}</Label>
                  <Input
                    name={name}
                    value={carInfo?.[name]}
                    onChange={updateValue}
                    placeholder={label}
                  />
                  {errors[name] && (
                    <p className="text-xs text-red-500">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <Label className="mb-2 ms-1">Car Status</Label>
                <select
                  name="carStatus"
                  value={carInfo?.carStatus}
                  onChange={updateValue}
                  className="border rounded-lg p-2 text-sm w-full"
                >
                  <option value="">Select Status</option>
                  <option value="true">Available</option>
                  <option value="false">Not Available</option>
                </select>
                {errors.carStatus && (
                  <p className="text-xs text-red-500">{errors.carStatus}</p>
                )}
              </div>

              <div>
                <Label className="mb-2 ms-1">Car Available Date</Label>
                <Input
                  type="date"
                  name="carAvailableDate"
                  value={carInfo?.carAvailableDate}
                  onChange={updateValue}
                />
                {errors.carAvailableDate && (
                  <p className="text-xs text-red-500">
                    {errors.carAvailableDate}
                  </p>
                )}
              </div>

              <div className="md:col-span-3">
                <textarea
                  name="carDescription"
                  value={carInfo?.carDescription}
                  onChange={updateValue}
                  className="border rounded-lg p-3 w-full h-32"
                  placeholder="Car Description"
                />
                {errors.carDescription && (
                  <p className="text-xs text-red-500">
                    {errors.carDescription}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => validateStep1() && setStep(2)}
                className="bg-yellow-300/80 text-black hover:bg-yellow-300/70"
              >
                Continue
              </Button>
            </div>
          </section>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Pricing & Specifications</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                ["carMileage", "Mileage"],
                ["carGearSystem", "Gear System"],
                ["carSeatingCapacity", "Seating Capacity"],
                ["carStorageCapacity", "Storage Capacity"],
                ["carFuelType", "Fuel Type"],
                ["carRent", "Rent Amount"],
              ].map(([name, label]) => (
                <div key={name}>
                  <Label className="mb-2 ms-1">{label}</Label>
                  <Input
                    name={name}
                    value={carInfo?.[name]}
                    onChange={updateValue}
                    placeholder={label}
                  />
                  {errors[name] && (
                    <p className="text-xs text-red-500">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <Label className="mb-2 ms-1">Select Currency</Label>
                <select
                  name="carCurrency"
                  value={carInfo?.carCurrency}
                  onChange={updateValue}
                  className="border rounded-lg p-2 text-sm w-full"
                >
                  <option value="">Select Currency</option>
                  <option value="RUPEES">RUPEES</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                </select>
                {errors.carCurrency && (
                  <p className="text-xs text-red-500">{errors.carCurrency}</p>
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
                className="bg-yellow-300/80 text-black hover:bg-yellow-300/70"
              >
                Continue
              </Button>
            </div>
          </section>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <section className="space-y-6">
            <h2 className="text-xl font-bold">Images</h2>

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
                  <Input type="file" name={name} onChange={updateValue} />

                  {preview[name] && (
                    <img
                      src={preview?.[name]}
                      alt={name}
                      className="mt-2 rounded-lg w-48 border"
                    />
                  )}

                  {errors[name] && (
                    <p className="text-xs text-red-500">{errors[name]}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                type="submit"
                className="bg-yellow-300/80 text-black hover:bg-yellow-300/70"
              >
                Save Changes
              </Button>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default AdminCarEdit;
