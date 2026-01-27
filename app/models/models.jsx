"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedCard from "./FeaturedCard";
import Loader from "@/app/loader";

const Models = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCarsData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/all-cars`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching cars data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCarsData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <FeaturedCard allCarsData={data} />
    </div>
  );
};

export default Models;