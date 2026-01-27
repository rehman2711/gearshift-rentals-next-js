"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Loader from "@/app/loader";
import { useTheme } from "next-themes";

const Car_Details = () => {
  const { id } = useParams();
  const router = useRouter();

  const [carData, setCarData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const { theme } = useTheme();
  const background =
    theme === "dark"
      ? `
      repeating-linear-gradient(
        45deg,
        rgba(115,135,135,0.045) 0,
        rgba(115,135,135,0.045) 1px,
        transparent 1px,
        transparent 30px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(120,135,145,0.045) 0,
        rgba(120,135,145,0.045) 1px,
        transparent 18px,
        transparent 28px
      ),
      radial-gradient(
        ellipse 120% 80% at 70% 20%,
        rgba(120,140,140,0.12),
        transparent 62%
      ),
      radial-gradient(
        ellipse 100% 60% at 30% 10%,
        rgba(125,140,150,0.14),
        transparent 72%
      ),
      rgb(14,16,17)
    `
      : `
      repeating-linear-gradient(
        45deg,
        rgba(125,140,140,0.03) 0,
        rgba(125,140,140,0.03) 1px,
        transparent 1px,
        transparent 32px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(130,145,155,0.03) 0,
        rgba(130,145,155,0.03) 1px,
        transparent 20px,
        transparent 30px
      ),
      radial-gradient(
        ellipse 120% 80% at 70% 20%,
        rgba(140,160,155,0.10),
        transparent 65%
      ),
      radial-gradient(
        ellipse 100% 60% at 30% 10%,
        rgba(140,155,165,0.12),
        transparent 75%
      ),
      rgb(249,248,246)
    `;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/single-car/${id}`,
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

  if (isLoading) return <Loader />;

  if (!carData?.carName)
    return (
      <div className="text-center text-gray-700 text-xl sm:text-2xl mt-32">
        Car not found
      </div>
    );

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 z-0 min-h-screen" style={{ background }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-16">
        {/* Back */}
        <Button
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-800 hover:bg-gray-300 mb-6 dark:bg-black/50 dark:text-white"
        >
          ← Back
        </Button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {/* LEFT */}
          <div>
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-3 border dark:bg-black/50">
              <img
                src={
                  selectedImg ||
                  `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${carData.carImageMain}`
                }
                className="w-full h-[260px] sm:h-[360px] lg:h-[430px] object-contain rounded-2xl"
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-5 grid grid-cols-4 sm:grid-cols-4 gap-3 dark:bg-black/50">
              {[
                carData.carImageMain,
                carData.carImageSub1,
                carData.carImageSub2,
                carData.carImageSub3,
              ]
                .filter(Boolean)
                .map((src, i) => {
                  const fullSrc =
                    process.env.NEXT_PUBLIC_IMAGE_PATH + "/" + src;

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedImg(fullSrc)}
                      className={`p-1 rounded-xl bg-white border transition
                        ${
                          selectedImg === fullSrc
                            ? "border-blue-500 dark:border-2"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                    >
                      <img
                        src={fullSrc}
                        className="w-full h-[70px] sm:h-[85px] object-cover rounded-lg"
                      />
                    </button>
                  );
                })}
            </div>

            {/* Rent Card */}
            <div className="mt-10 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border dark:bg-black/50 dark:text-white">
              <div className="flex items-end gap-2 flex-wrap">
                <span className="text-lg text-gray-500">
                  {carData.carCurrency}
                </span>
                <span className="text-4xl sm:text-5xl font-bold">
                  {carData.carRent}
                </span>
                <span className="text-lg text-gray-500">{carData.cDay}</span>
              </div>

              <hr className="my-6" />

              <h2 className="text-xl sm:text-2xl font-semibold">
                Interested in Renting?
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 mt-5">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
                  Submit an Enquiry
                </Button>

                {carData.carStatus === "true" ? (
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 w-full sm:w-auto"
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
                        `/models/availability/${carData.id}/notify_me`,
                      )
                    }
                    className="bg-gray-300 hover:bg-gray-400 w-full sm:w-auto"
                  >
                    Notify Me – Not Available
                  </Button>
                )}
              </div>

              <hr className="my-6" />

              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Contact Us
              </h2>

              <div className="space-y-3">
                <ContactItem text="rehman@gearshift.com" />
                <ContactItem text="+91 12345 12345" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {carData.cName}
            </h1>

            <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
              <InfoTag icon="⚡" label={carData.carMileage} />
              <InfoTag icon="⚙️" label={carData.carGearSystem} />
              <InfoTag icon="🧍" label={carData.carSeatingCapacity} />
              <InfoTag icon="🧳" label={carData.carStorageCapacity} />
              <InfoTag icon="📅" label={carData.carManufactureYear} />
              <InfoTag icon="🚘" label={carData.carBrandName} />
            </div>

            <p className="mt-6 sm:mt-8 text-gray-600 text-base sm:text-lg leading-relaxed">
              {carData.cText}
            </p>

            <SectionHeader title="Specifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <SectionHeader title="Features" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

/* SUB COMPONENTS */

const SectionHeader = ({ title }) => (
  <h2 className="text-2xl sm:text-3xl font-semibold mt-10 mb-3">{title}</h2>
);

const InfoTag = ({ icon, label }) => (
  <div className="px-3 py-2 bg-gray-100 rounded-xl flex items-center gap-2 text-sm border shadow-sm dark:bg-black/50 dark:text-white">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

const Spec = ({ label, value }) => (
  <div className="bg-white px-4 py-2 rounded-xl flex justify-between shadow border dark:bg-black/50 dark:text-white">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-xl border hover:bg-gray-200 transition dark:bg-black/50 dark:text-white">
    <span className="text-green-600">✔</span>
    <span>{text}</span>
  </div>
);

const ContactItem = ({ text }) => (
  <div className="flex items-center gap-3">
    <span>📩</span>
    <span>{text}</span>
  </div>
);

export default Car_Details;
