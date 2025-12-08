"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AdminShowAll = () => {
  const [cars, setCars] = useState([]);

  const router = useRouter();

  // FETCH DATA
  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/all-cars`
      );
      setCars(result.data);
      console.log(result.data);
    } catch (error) {
      console.log("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE CAR
  const DeleteCar = async (id) => {
    alert(`Car Is Successfully Deleted [ Car Id Is ${id} ]`);

    // Optimistic Update
    setCars((prev) => prev.filter((item) => item.id !== id));

    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/single-car/${id}`);
  };

  return (
    <>
      <div className="p-2 bg-yellow-400 flex justify-between items-center rounded-xl shadow-lg mx-10">
        <h1 className="text-white text-3xl font-bold tracking-wide mx-auto">
          All Rental Cars
        </h1>
        <div>
          <Button
            onClick={() => {
              router.back();
            }}
          >
            Back
          </Button>
        </div>
      </div>

      <div className="w-full">
        <div className="max-w-7xl mx-auto">
          {/* CARD GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {cars.map((val) => (
              <div
                key={val.id}
                className="bg-white rounded-2xl shadow-md p-4 relative"
              >
                {/* YEAR BADGE */}
                <span className="absolute right-5 top-5 bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-semibold">
                  {val.carManufactureYear}
                </span>

                {/* CAR IMAGE */}
                <div className="w-full h-52 rounded-lg overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${val.carImageMain}`}
                    className="w-full h-full object-cover"
                    alt={val.carName}
                  />
                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-xl font-bold">{val.carName}</h3>

                {/* PRICE */}
                <div className="mt-2 text-lg">
                  <span>{val.carCurrency}</span>
                  <span className="font-bold text-2xl"> {val.carRent}</span>
                  <span> / Day </span>
                </div>

                {/* SPECS */}
                <div className="flex justify-between bg-black/10 mt-3 p-3 rounded-xl">
                  <div className="flex flex-col items-center">
                    <img
                      src="/images/card-svg/mileage-icon.svg"
                      className="h-6"
                    />
                    <span className="text-sm">{val.carMileage}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="/images/card-svg/transmission-icon.svg"
                      className="h-6"
                    />
                    <span className="text-sm">{val.carFuelType}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="/images/card-svg/seats-icon.svg"
                      className="h-6"
                    />
                    <span className="text-sm">{val.carSeatingCapacity}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <img
                      src="/images/card-svg/baggage-icon.svg"
                      className="h-6"
                    />
                    <span className="text-sm">{val.carStorageCapacity}</span>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex justify-between mt-5">
                  <Link
                    href={`/login/admin/manage_data/car_edit/${val.id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                  >
                    Edit
                  </Link>

                  <Button
                    className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700"
                    onClick={() => DeleteCar(val.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/* END GRID */}
        </div>
      </div>
    </>
  );
};

export default AdminShowAll;
