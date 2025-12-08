"use client";
import React, { useEffect, useState } from "react";
import DomeGallery from "./DomeGallery";
import axios from "axios";

const Gallary = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [images, setImages] = useState([]); //

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/all-cars`
        );

        setFetchedData(imageResponse.data);
        console.log(imageResponse.data);

        //  2 → convert API data to array of image objects
        const formattedImages = imageResponse.data.map((item, index) => ({
          src: `${process.env.NEXT_PUBLIC_IMAGE_PATH}/${item.carImageMain}`,
          alt: `car-${item.carName}`,
        }));

        setImages(formattedImages);
      } catch (error) {
        console.error("Error fetching cars images:", error);
      }
    };

    fetchImages();
  }, []);

  console.log(images);

  return (
    <div className="mx-auto" style={{ width: "100vw", height: "91.5vh" }}>
      <DomeGallery images={images} /> {/*  3 → now receives ARRAY */}
    </div>
  );
};

export default Gallary;
