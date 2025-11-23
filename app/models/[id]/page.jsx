"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------- */
/* MAIN COMPONENT */
/* -------------------------------------------------- */

const DetailCars = () => {
  const { id } = useParams();
  const router = useRouter();

  const [carData, setCarData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`
        );
        setCarData(result.data);
        setSelectedImg(result.data.cImg);
      } catch (error) {
        console.log("Error fetching car details:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <SkeletonUI />;

  if (!carData?.cName)
    return (
      <div className="text-center text-white text-2xl mt-40">
        ❌ Car not found
      </div>
    );

  return (
    <>
      {/* Background */}
      <div
        className="fixed inset-0 z-0 min-h-screen"
        style={{
          background:
            "radial-gradient(140% 140% at 50% 0%, #000 30%, #091a33 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-14 pb-14">
        {/* Back button */}
        <Button
          onClick={() => router.back()}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition mb-6 border border-white/20"
        >
          ⬅ Back
        </Button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT — Image Gallery */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-black/40 p-3 backdrop-blur-xl border border-white/10">
              <img
                src={selectedImg}
                className="w-full rounded-2xl object-contain h-[430px]"
              />
            </div>

            <div className="mt-5 grid grid-cols-4 gap-4">
              {[carData.cImg, carData.img1, carData.img2, carData.img3]
                .filter(Boolean)
                .map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(src)}
                    className={`p-1 rounded-xl bg-white/10 backdrop-blur-md border transition 
                      ${
                        selectedImg === src
                          ? "border-yellow-400"
                          : "border-transparent hover:border-white/30"
                      }`}
                  >
                    <img
                      src={src}
                      className="w-full h-[85px] object-cover rounded-lg"
                    />
                  </button>
                ))}
            </div>

            {/* Rent Card */}
            <div className="mt-10 bg-white/10 text-white p-8 rounded-3xl backdrop-blur-xl shadow-xl border border-white/10">
              {/* Price */}
              <div className="flex items-end gap-2">
                <span className="text-xl opacity-80">{carData.cCurrency}</span>
                <span className="text-5xl font-bold drop-shadow">
                  {carData.cMoney}
                </span>
                <span className="text-xl opacity-80">/ {carData.cDay}</span>
              </div>

              <hr className="my-6 border-white/20" />

              <h2 className="text-2xl font-semibold">Interested in Renting?</h2>

              <div className="flex gap-4 mt-5">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
                  Submit an Enquiry
                </Button>

                <Button
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl"
                  onClick={() =>
                    router.push(`/models/availability/${carData.id}/rent_now`)
                  }
                >
                  Book Now
                </Button>
              </div>

              <hr className="my-6 border-white/20" />

              {/* Contact */}
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

              <div className="space-y-3 text-white/90">
                <ContactItem text="rehman@gearshift.com" />
                <ContactItem text="+91 12345 12345" />
              </div>
            </div>
          </div>

          {/* RIGHT — Car Details */}
          <div>
            <h1 className="text-white text-5xl font-bold leading-tight drop-shadow">
              {carData.cName}
            </h1>

            {/* Quick Tags */}
            <div className="flex flex-wrap gap-3 mt-8">
              <InfoTag icon="⚡" label={carData.mileage} />
              <InfoTag icon="⚙️" label={carData.type} />
              <InfoTag icon="🧍" label={carData.person} />
              <InfoTag icon="🧳" label={carData.bags} />
              <InfoTag icon="📅" label={carData.cYear} />
              <InfoTag icon="🚘" label={carData.cModel} />
            </div>

            {/* Description */}
            <p className="mt-8 text-white/80 leading-relaxed text-lg">
              {carData.cText}
            </p>

            {/* Specifications */}
            <SectionHeader title="Specifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Spec label="Fuel Type" value={carData.cFuel} />
              <Spec label="Mileage" value={carData.mileage} />
              <Spec label="Transmission" value={carData.type} />
              <Spec label="Seats" value={carData.person} />
              <Spec label="Baggage" value={carData.bags} />
              <Spec label="Year" value={carData.cYear} />
              <Spec label="Type" value={carData.cModel} />
              <Spec label="Brand" value={carData.cBrand} />
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
/* SUB COMPONENTS — Redesigned */
/* -------------------------------------------------- */

const SectionHeader = ({ title }) => (
  <h2 className="text-3xl font-semibold text-white mt-10 mb-3">{title}</h2>
);

const InfoTag = ({ icon, label }) => (
  <div className="px-3 py-2 bg-white/10 backdrop-blur-md rounded-xl flex items-center gap-2 text-white text-sm border border-white/10">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

const Spec = ({ label, value }) => (
  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex justify-between text-white shadow border border-white/10">
    <span className="opacity-80">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const FeatureItem = ({ text }) => (
  <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl text-white hover:bg-white/10 transition border border-white/5">
    <span className="text-lg">✔</span>
    <span>{text}</span>
  </div>
);

const ContactItem = ({ text }) => (
  <div className="flex items-center gap-3">
    <span>📩</span>
    <span>{text}</span>
  </div>
);

/* ---------------- SKELETON ---------------- */

const SkeletonUI = () => (
  <div
    className="animate-pulse w-full min-h-screen pt-32 px-10"
    style={{
      background:
        "radial-gradient(140% 140% at 50% 0%, #000 30%, #091a33 100%)",
    }}
  >
    <div className="max-w-7xl mx-auto bg-white/10 h-[450px] rounded-xl"></div>
  </div>
);

export default DetailCars;
