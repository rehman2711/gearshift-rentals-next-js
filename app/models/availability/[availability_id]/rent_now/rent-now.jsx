"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/app/loader";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function RentTheCarNow() {
  const router = useRouter();
  const params = useParams();

  const { data: session } = useSession();

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
    if (!session) {
      toast.error(
        <span className="font-sans">You must be logged in to book a car</span>,
      );
      return redirect("/login");
    }

    const fetchCar = async () => {
      try {
        if (!params?.availability_id) return;

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/single-car/${params.availability_id}`,
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
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      toast.success("Booking Completed.", { duration: 10000 });

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

  if (isLoading) return <Loader />;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen py-8 sm:py-10 px-4 bg-white dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl space-y-8 sm:space-y-10 dark:bg-white/5 dark:text-white"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600">
          Rent The Car
        </h2>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <section className="space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold">
              Personal Details
            </h3>

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
                  className="w-full p-2 text-sm border rounded-lg dark:bg-black/50 dark:text-white"
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
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {/* LEFT */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold">
                Booking Details
              </h3>

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

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit Booking
                </Button>
              </div>
            </div>

            {/* RIGHT – PREVIEW */}
            <div className="bg-white/70 dark:bg-white/5 p-4 sm:p-6 rounded-2xl shadow-xl border flex flex-col items-center">
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-center">
                You Chose{" "}
                <span className="text-blue-600">{selectedCar?.carName}</span>
              </h4>

              {selectedCar?.carImageMain ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${selectedCar.carImageMain}`}
                  className="rounded-xl shadow-md w-full max-h-[300px] object-cover"
                />
              ) : (
                <p className="text-gray-500 mt-16">Loading image...</p>
              )}
            </div>
          </section>
        )}
      </form>
    </div>
  );
}
