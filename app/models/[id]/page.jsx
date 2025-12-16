"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/app/loader";

/* -------------------------------------------------- */
/* MAIN COMPONENT */
/* -------------------------------------------------- */

const DetailCars = () => {
  const { id } = useParams();
  const router = useRouter();

  const [carData, setCarData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/single-car/${id}`
        );
        setCarData(result.data[0]);
        setSelectedImg(result.data.cImg);
      } catch (error) {
        console.log("Error fetching car details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  if (!carData?.carName)
    return (
      <div className="text-center text-gray-700 text-2xl mt-40">
        Car not found
      </div>
    );

  return (
    <>
      {/* Light Background */}
      <div
        className="fixed inset-0 z-0 min-h-screen"
        style={{
          background: `
            /* TOP: subtle line texture */
            repeating-linear-gradient(
              45deg,
              rgba(16, 185, 129, 0.06) 0,
              rgba(16, 185, 129, 0.06) 1px,
              transparent 1px,
              transparent 20px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(6, 182, 212, 0.06) 0,
              rgba(6, 182, 212, 0.06) 1px,
              transparent 10px,
              transparent 15px
            ),
        
            /* MIDDLE: green-blue radial glows */
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(16, 185, 129, 0.14), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(6, 182, 212, 0.16), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(56, 189, 248, 0.14), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(34, 197, 94, 0.10), transparent 40%),
        
            /* BASE */
            rgb(254, 250, 250)
          `,
          backgroundSize: "40px 40px, 40px 40px, auto, auto, auto, auto, auto",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-14">
        {/* Back button */}
        <Button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition mb-6 border border-gray-300"
        >
          ← Back
        </Button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT — Image Gallery */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-3 border border-gray-200">
              <img
                src={
                  selectedImg ||
                  process.env.NEXT_PUBLIC_IMAGE_PATH +
                    "/" +
                    carData.carImageMain
                }
                className="w-full rounded-2xl object-contain h-[430px]"
              />
            </div>

            <div className="mt-5 grid grid-cols-4 gap-4">
              {[
                carData.carImageMain,
                carData.carImageSub1,
                carData.carImageSub2,
                carData.carImageSub3,
              ]
                .filter(Boolean)
                .map((src, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setSelectedImg(
                        process.env.NEXT_PUBLIC_IMAGE_PATH + "/" + src
                      )
                    }
                    className={`p-1 rounded-xl bg-white border transition shadow-sm
                      ${
                        selectedImg ===
                        process.env.NEXT_PUBLIC_IMAGE_PATH + "/" + src
                          ? "border-blue-500 shadow"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                  >
                    <img
                      src={process.env.NEXT_PUBLIC_IMAGE_PATH + "/" + src}
                      className="w-full h-[85px] object-cover rounded-lg"
                    />
                  </button>
                ))}
            </div>

            {/* Rent Card */}
            <div className="mt-10 bg-white text-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200">
              {/* Price */}
              <div className="flex items-end gap-2">
                <span className="text-xl text-gray-500">
                  {carData.carCurrency}
                </span>
                <span className="text-5xl font-bold text-gray-900">
                  {carData.carRent}
                </span>
                <span className="text-xl text-gray-500">{carData.cDay}</span>
              </div>

              <hr className="my-6 border-gray-200" />

              <h2 className="text-2xl font-semibold">Interested in Renting?</h2>

              <div className="flex gap-4 mt-5">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
                  Submit an Enquiry
                </Button>

                {carData.carStatus === "true" ? (
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl"
                    onClick={() =>
                      router.push(`/models/availability/${carData.id}/rent_now`)
                    }
                  >
                    Book Now
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      router.push(
                        `/models/availability/${carData.id}/notify_me`
                      )
                    }
                    className="bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                  >
                    Notify Me – Not Available
                  </Button>
                )}
              </div>

              <hr className="my-6 border-gray-200" />

              {/* Contact */}
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

              <div className="space-y-3 text-gray-700">
                <ContactItem text="rehman@gearshift.com" />
                <ContactItem text="+91 12345 12345" />
              </div>
            </div>
          </div>

          {/* RIGHT — Car Details */}
          <div>
            <h1 className="text-gray-900 text-5xl font-bold leading-tight">
              {carData.cName}
            </h1>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              <InfoTag icon="⚡" label={carData.carMileage} />
              <InfoTag icon="⚙️" label={carData.carGearSystem} />
              <InfoTag icon="🧍" label={carData.carSeatingCapacity} />
              <InfoTag icon="🧳" label={carData.carStorageCapacity} />
              <InfoTag icon="📅" label={carData.carManufactureYear} />
              <InfoTag icon="🚘" label={carData.carBrandName} />
            </div>

            {/* Description */}
            <p className="mt-8 text-gray-600 leading-relaxed text-lg">
              {carData.cText}
            </p>

            {/* Specifications */}
            <SectionHeader title="Specifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Spec label="Fuel Type" value={carData.carFuelType} />
              <Spec label="Mileage" value={carData.carMileage} />
              <Spec label="Gear System" value={carData.carGearSystem} />
              <Spec label="Seats" value={carData.carSeatingCapacity} />
              <Spec label="Storage" value={carData.carStorageCapacity} />
              <Spec
                label="Manufacture Year"
                value={carData.carManufactureYear}
              />
              <Spec label="Model" value={carData.carModelName} />
              <Spec label="Brand" value={carData.carBrandName} />
            </div>

            {/* Features */}
            <SectionHeader title="Features" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FeatureItem text="Bluetooth" />
              <FeatureItem text="Cruise Control" />
              <FeatureItem text="Built-in GPS" />
              <FeatureItem text="Rear Camera" />
              <FeatureItem text="Wireless Charging" />
              <FeatureItem text="Parking Sensors" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* -------------------------------------------------- */
/* SUB COMPONENTS — Light Theme */
/* -------------------------------------------------- */

const SectionHeader = ({ title }) => (
  <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-3">{title}</h2>
);

const InfoTag = ({ icon, label }) => (
  <div className="px-3 py-2 bg-gray-100 rounded-xl flex items-center gap-2 text-gray-700 text-sm border border-gray-300 shadow-sm">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

const Spec = ({ label, value }) => (
  <div className="bg-white px-4 py-2 rounded-xl flex justify-between text-gray-800 shadow border border-gray-200">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-xl text-gray-800 hover:bg-gray-200 transition border border-gray-300">
    <span className="text-green-600 text-lg">✔</span>
    <span>{text}</span>
  </div>
);

const ContactItem = ({ text }) => (
  <div className="flex items-center gap-3 text-gray-700">
    <span>📩</span>
    <span>{text}</span>
  </div>
);


export default DetailCars;
