"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/app/loader";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const initialCustomerState = {
  customerImage: null,
  customerName: "",
  customerMobile: "",
  customerEmail: "",
  customerGender: "",
  customerAddress: "",
  customerPAN: "",
  customerChoosenCar: "", // ✅ car ID (for select)
  customerChoosenCarName: "", // ✅ car name (for backend)
  customerChoosenCarFrom: "",
  customerChoosenCarTo: "",
};

const BookNow = () => {
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [customer, setCustomer] = useState(initialCustomerState);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  //   console.log(session);

  /* -------------------- FETCH CARS -------------------- */
  useEffect(() => {
    if (!session) {
      toast.error(
        <span className="font-sans">You must be logged in to book a car</span>,
      );
      return redirect("/login");
    }

    const fetchCars = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/all-cars`,
        );
        setCars(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (isLoading) return <Loader />;

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      customerImage: e.target.files?.[0] || null,
    }));
  };

  const handleCarChange = (e) => {
    const carId = e.target.value;

    const car = cars.find((c) => String(c.id) === String(carId));

    setSelectedCar(car || null);

    setCustomer((prev) => ({
      ...prev,
      customerChoosenCar: carId, // ✅ ID for select
      customerChoosenCarName: car?.carName || "", // ✅ name for backend
    }));
  };

  /* -------------------- VALIDATION -------------------- */
  const validateStep1 = () => {
    const newErrors = {};
    [
      "customerName",
      "customerMobile",
      "customerEmail",
      "customerGender",
      "customerAddress",
      "customerPAN",
    ].forEach((f) => {
      if (!customer[f]) newErrors[f] = "Required";
    });
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

    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.entries(customer).forEach(([k, v]) => formData.append(k, v));

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/book-car`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setCustomer(initialCustomerState);
      setSelectedCar(null);
      setStep(1);
      setErrors({});
      router.replace("/models");

      toast.success("Booking Completed.", { duration: 8000 });
    } catch (err) {
      console.error("Error submitting booking:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen py-8 sm:py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-white/60 backdrop-blur-xl border p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl space-y-8 sm:space-y-10 dark:bg-white/5 dark:text-white"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-yellow-500">
          Rent a Car — Premium Service
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
                ["Email", "customerEmail"],
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
                <Label className="mb-2 ms-1">PAN Number</Label>
                <Input
                  name="customerPAN"
                  value={customer.customerPAN}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label className="mb-2 ms-1">Gender</Label>
                <select
                  name="customerGender"
                  value={customer.customerGender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-black/90 dark:text-white"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div>
                <Label className="mb-2 ms-1">Upload Photo</Label>
                <Input type="file" onChange={handleFileChange} />
              </div>
            </div>

            <Button
              type="button"
              onClick={() => validateStep1() && setStep(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
            >
              Continue
            </Button>
          </section>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <section className="space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold">
              Car Booking Details
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT */}
              <div className="flex flex-col gap-6">
                <div>
                  <Label className="mb-2 ms-1">Choose Car</Label>
                  <select
                    value={customer.customerChoosenCar}
                    onChange={handleCarChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm dark:bg-black/90 dark:text-white"
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
                  <Label className="mb-2 ms-1">From Date</Label>
                  <Input
                    type="date"
                    name="customerChoosenCarFrom"
                    value={customer.customerChoosenCarFrom}
                    onChange={handleChange}
                  />
                </div>

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
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Submit Booking
                  </Button>
                </div>
              </div>

              {/* RIGHT */}
              <div className="p-5 bg-white/70 rounded-xl shadow-xl border-t flex items-center justify-center dark:bg-black/50">
                {selectedCar ? (
                  <div className="space-y-3 w-full">
                    <p className="font-medium text-center">
                      You Selected:{" "}
                      <span className="text-yellow-500">
                        {selectedCar.carName}
                      </span>
                    </p>

                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${selectedCar.carImageMain}`}
                      alt="Car"
                      className="w-full max-h-[320px] object-cover rounded-xl shadow-md"
                    />
                  </div>
                ) : (
                  <p className="text-gray-500 text-center">
                    Select a car to preview
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </form>
    </div>
  );
};

export default BookNow;
