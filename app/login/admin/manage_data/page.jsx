"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/app/loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminShowAll = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const router = useRouter();

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/all-cars`
      );
      setCars(result.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  /* ---------------- DELETE HANDLER ---------------- */
  const handleDelete = async () => {
    if (!selectedCarId) return;

    try {
      setCars((prev) => prev.filter((car) => car.id !== selectedCarId));
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/delete-car/${selectedCarId}`
      );
    } catch (error) {
      console.error("Delete failed:", error);
      fetchData();
    } finally {
      setSelectedCarId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* HEADER */}
      <div
        className="flex flex-col sm:flex-row items-center gap-4 rounded-xl shadow-lg px-4 sm:px-6 py-4"
        style={{
          backgroundImage: `
            repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75,85,99,0.06) 2px, rgba(75,85,99,0.06) 3px, transparent 3px, transparent 8px),
            radial-gradient(circle 500px at 50% 100px, rgba(245,237,14,0.4), transparent)
          `,
        }}
      >
        <h1 className="text-black text-2xl sm:text-3xl font-bold mx-auto text-center dark:text-white">
          All Rental Cars
        </h1>

        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="bg-yellow-400/50 hover:bg-yellow-500/50 w-full sm:w-auto"
        >
          Back
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-2xl shadow-md p-4 relative flex flex-col border border-gray-300 dark:bg-black dark:border dark:border-gray-700"
          >
            {/* YEAR BADGE */}
            <span className="absolute right-4 top-4 bg-yellow-400 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold">
              {car.carManufactureYear}
            </span>

            {/* IMAGE */}
            <div className="w-full h-48 sm:h-52 rounded-lg overflow-hidden">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${car.carImageMain}`}
                alt={car.carName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* INFO */}
            <h3 className="mt-4 text-lg sm:text-xl font-bold">
              {car.carName}
            </h3>

            <div className="mt-2 text-base sm:text-lg">
              {car.carCurrency}
              <span className="font-bold text-xl sm:text-2xl">
                {" "}
                {car.carRent}
              </span>{" "}
              / Day
            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-between">
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto dark:text-white">
                <Link
                  href={`/login/admin/manage_data/car_edit/${car.id}`}
                  className="w-full block text-center"
                >
                  Edit
                </Link>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                    onClick={() => setSelectedCarId(car.id)}
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete this car?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The car will be permanently
                      removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter className="flex flex-col sm:flex-row gap-3">
                    <AlertDialogCancel className="w-full sm:w-auto">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                      onClick={handleDelete}
                    >
                      Yes, Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminShowAll;
