"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/app/loader";
import toast from "react-hot-toast";

export default function RentTheCarNow() {
  const router = useRouter();
  const params = useParams();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [selectedCar, setSelectedCar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [customer, setCustomer] = useState({
    customerName: "",
    customerMobile: "",
    customerEmail: "",
    customerGender: "",
    customerAddress: "",
    customerPAN: "",
    customerChoosenCar: "",
    customerChoosenCarFrom: "",
    customerChoosenCarTo: "",
    customerImage: null,
  });

  /* ---------------- FETCH SELECTED CAR ---------------- */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        if (!params?.availability_id) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/single-car/${params.availability_id}`
        );

        const car = res.data[0];
        setSelectedCar(car);

        setCustomer((prev) => ({
          ...prev,
          customerChoosenCar: car?.carName || "",
        }));
      } catch (err) {
        console.error("Error fetching car:", err);
      }
    };

    fetchCar();
  }, [params]);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      customerImage: e.target.files?.[0] || null,
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validateStep1 = () => {
    const err = {};
    if (!customer.customerName) err.customerName = "Required";
    if (!customer.customerMobile) err.customerMobile = "Required";
    if (!customer.customerEmail) err.customerEmail = "Required";
    if (!customer.customerGender) err.customerGender = "Required";
    if (!customer.customerAddress) err.customerAddress = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const validateStep2 = () => {
    const err = {};
    if (!customer.customerChoosenCarFrom)
      err.customerChoosenCarFrom = "Required";
    if (!customer.customerChoosenCarTo) err.customerChoosenCarTo = "Required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(customer).forEach(([k, v]) => formData.append(k, v));

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/book-car`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Booking Completed.", {
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

      setSelectedCar(null);
      setStep(1);
      setErrors({});

      router.replace("/models");
    } catch (err) {
      console.error("Error submitting booking:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit after loading
  if (isLoading) {
    return <Loader />;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-b from-white to-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border p-10 rounded-3xl shadow-2xl space-y-10"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Rent The Car
        </h2>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <section className="space-y-6">
            <h3 className="text-xl font-semibold">Personal Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["Customer Name", "customerName"],
                ["Mobile Number", "customerMobile"],
                ["Email Address", "customerEmail"],
                ["Residential Address", "customerAddress"],
              ].map(([label, name]) => (
                <div key={name}>
                  <Label className="mb-2 ms-1">{label}</Label>
                  <Input
                    name={name}
                    value={customer[name]}
                    onChange={handleChange}
                  />
                  {errors[name] && (
                    <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                  )}
                </div>
              ))}

              <div>
                <Label className="mb-2 ms-1">Gender</Label>
                <select
                  name="customerGender"
                  value={customer.customerGender}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border rounded-lg"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                {errors.customerGender && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.customerGender}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 ms-1">PAN Number</Label>
                <Input
                  name="customerPAN"
                  value={customer.customerPAN}
                  onChange={handleChange}
                  placeholder="ABCDE1234F"
                />
                <p className="text-xs mt-2 ms-2 text-green-600">
                  FORMAT : ABCDE1234F
                </p>
              </div>

              <div>
                <Label className="mb-2 ms-1">Customer Photo</Label>
                <Input type="file" onChange={handleFileChange} />
              </div>
            </div>

            <Button
              type="button"
              onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue
            </Button>
          </section>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Booking Details</h3>

              <div>
                <Label className="mb-2 ms-1">Selected Car</Label>
                <Input
                  value={selectedCar?.carName || ""}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <div>
                <Label className="mb-2 ms-1">From Date</Label>
                <Input
                  type="date"
                  name="customerChoosenCarFrom"
                  value={customer.customerChoosenCarFrom}
                  onChange={handleChange}
                />
                {errors.customerChoosenCarFrom && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.customerChoosenCarFrom}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 ms-1">To Date</Label>
                <Input
                  type="date"
                  name="customerChoosenCarTo"
                  value={customer.customerChoosenCarTo}
                  onChange={handleChange}
                />
                {errors.customerChoosenCarTo && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.customerChoosenCarTo}
                  </p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit Booking
                </Button>
              </div>
            </div>

            {/* RIGHT – CAR PREVIEW */}
            <div className="bg-white/70 p-6 rounded-2xl shadow-xl border flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-4">
                You Chose{" "}
                <span className="text-blue-600">{selectedCar?.carName}</span>
              </h4>

              {selectedCar?.carImageMain ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${selectedCar.carImageMain}`}
                  className="rounded-xl shadow-md"
                />
              ) : (
                <p className="text-gray-500 mt-20">Loading image...</p>
              )}
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
