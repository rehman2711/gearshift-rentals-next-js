"use client";
import React, { useEffect, useState } from "react";
import DomeGallery from "./DomeGallery";
import axios from "axios";

const Gallary = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const imageResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cars`
      );

      console.log("Cars data:", imageResponse.data);
      setFetchedData(imageResponse.data);
    } catch (error) {
      console.error("Error fetching cars images:", error);
    }
  };

  // Fetch images only once when component loads
  useEffect(() => {
    fetchImages();
  }, []);

  // Whenever fetchedData updates, prepare images array
  useEffect(() => {
    if (fetchedData.length > 0) {
      const formattedImages = fetchedData.map((item, index) => ({
        src: item.cImg,
        alt: `car-${index}`,
      }));

      setImages(formattedImages);
    }
  }, [fetchedData]);

  return (
    <div>
      <DomeGallery images={images} />
    </div>
  );
};

export default Gallary;
