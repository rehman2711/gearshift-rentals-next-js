"use client";
import axios from "axios";
import { useEffect } from "react";

const WebhookTrigger = () => {
  const fetchCarsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/all-cars`
      );
      console.log("Cars data:", response.data);
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  useEffect(() => {
    fetchCarsData();
  }, []);
  return <></>;
};

export default WebhookTrigger;
