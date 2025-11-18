"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FeaturedCard from "./FeaturedCard";

const Models = () => {
  const [data, setData] = useState([]);
  const fetchCarsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cars`
      );
      console.log("Cars data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  useEffect(() => {
    fetchCarsData();
  }, []);
  return (
    <>
      <div className="bg-white">
        <FeaturedCard allCarsData={data} />
      </div>
    </>
  );
};

export default Models;
