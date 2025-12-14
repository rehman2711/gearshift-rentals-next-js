"use client";
import React, { Activity, useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialCustomerState = {
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
};

const RentNow = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [customer, setCustomer] = useState(initialCustomerState);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  /* -------------------- FETCH CARS -------------------- */
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/all-cars`)
      .then((res) => setCars(res.data))
      .catch(console.error);
  }, []);

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      customerImage: e.target.files?.[0] || null,
    }));
  };

  const handleCarChange = (e) => {
    const carId = e.target.value;

    setCustomer((prev) => ({
      ...prev,
      customerChoosenCar: carId,
    }));

    const foundCar = cars.find((car) => String(car.id) === String(carId));

    setSelectedCar(foundCar || null);
  };

  /* -------------------- VALIDATION -------------------- */
  const validateStep1 = () => {
    const newErrors = {};
    if (!customer.customerName) newErrors.customerName = "Required";
    if (!customer.customerMobile) newErrors.customerMobile = "Required";
    if (!customer.customerEmail) newErrors.customerEmail = "Required";
    if (!customer.customerGender) newErrors.customerGender = "Required";
    if (!customer.customerAddress) newErrors.customerAddress = "Required";
    if (!customer.customerPAN) newErrors.customerPAN = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!customer.customerChoosenCar) newErrors.customerChoosenCar = "Required";
    if (!customer.customerChoosenCarFrom)
      newErrors.customerChoosenCarFrom = "Required";
    if (!customer.customerChoosenCarTo)
      newErrors.customerChoosenCarTo = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const formData = new FormData();
    Object.entries(customer).forEach(([k, v]) => formData.append(k, v));

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/book-car`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setCustomer(initialCustomerState);
    setSelectedCar(null);
    setStep(1);
    setErrors({});
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border p-10 rounded-3xl shadow-2xl space-y-10"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-500">
          Rent a Car — Premium Service
        </h2>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <section className="space-y-6">
            <h3 className="text-xl font-semibold">Personal Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ["Customer Name", "customerName"],
                ["Mobile Number", "customerMobile"],
                ["Email", "customerEmail"],
                ["Residential Address", "customerAddress"],
                ["PAN Number", "customerPAN"],
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
                  className="w-full px-3 py-2 border rounded-lg text-sm"
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
                <Label className="mb-2 ms-1">Upload Photo</Label>
                <Input type="file" onChange={handleFileChange} />
              </div>
            </div>

            <Button
              type="button"
              onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              Continue
            </Button>
          </section>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <section className="space-y-6">
            <h3 className="text-xl font-semibold">Car Booking Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-8">
                {/* 1 */}
                <div>
                  <Label className="mb-2 ms-1">Choose Car</Label>
                  <select
                    value={customer.customerChoosenCar}
                    onChange={handleCarChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  >
                    <option value="">Select Car</option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.carName}
                      </option>
                    ))}
                  </select>
                  {errors.customerChoosenCar && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.customerChoosenCar}
                    </p>
                  )}
                </div>
                {/* 2 */}
                <div>
                  <Label className="mb-2 ms-1">From Date</Label>
                  <Input
                    type="date"
                    name="customerChoosenCarFrom"
                    value={customer.customerChoosenCarFrom}
                    onChange={handleChange}
                  />
                </div>

                {/* 3 */}
                <div>
                  <Label className="mb-2 ms-1">To Date</Label>
                  <Input
                    type="date"
                    name="customerChoosenCarTo"
                    value={customer.customerChoosenCarTo}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setStep(1);
                      setSelectedCar(null);
                    }}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  >
                    Submit Booking
                  </Button>
                </div>
              </div>
              {/* CAR SELECT */}

              <Activity>
                {/* CAR PREVIEW */}
                <div className="p-5 bg-white/70 rounded-xl shadow-xl border-t">
                  {/* <h4 className="text-lg font-semibold mb-3">Car Preview</h4> */}

                  {/* <div className="h-[420px] overflow-y-auto border rounded-xl p-4 bg-white"> */}
                  {selectedCar ? (
                    <>
                      <p className="font-medium mb-2">
                        You Selected:{" "}
                        <span className="text-yellow-500">
                          {selectedCar.carName}
                        </span>
                      </p>

                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${selectedCar.carImageMain}`}
                        alt="Car"
                        className="w-full rounded-xl shadow-md"
                      />
                    </>
                  ) : (
                    <p className="text-center mt-24 text-gray-500">
                      Select a car to preview
                    </p>
                  )}
                  {/* </div> */}
                </div>
              </Activity>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default RentNow;
