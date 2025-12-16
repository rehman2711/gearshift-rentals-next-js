"use client";
import Container from "@/app/components/Container";
import BentoGrid from "@/app/components/BentoGrid";
import { useEffect } from "react";
import Loader from "@/app/loader";
import { useState } from "react";

const About = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  const numarr = [
    { id: 1, num: "10+", word: "Years of Experience" },
    { id: 2, num: "1000+", word: "Happy Clients" },
    { id: 3, num: "200+", word: "Vehicles" },
    { id: 4, num: "10+", word: "Locations" },
  ];

  const values = [
    {
      id: 1,
      img: "/images/about-images/excellence.png",
      heading: "Excellence",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, ipsa.",
    },
    {
      id: 2,
      img: "/images/about-images/reliability.png",
      heading: "Reliability",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, ipsa.",
    },
    {
      id: 3,
      img: "/images/about-images/affordability.png",
      heading: "Affordability",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, ipsa.",
    },
    {
      id: 4,
      img: "/images/about-images/loyalty.png",
      heading: "Loyalty",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, ipsa.",
    },
  ];

  const locations = [
    {
      id: 1,
      img: "/images/about-images/ichalkaranji.jpg",
      lname: "Ichalkaranji",
    },
    { id: 2, img: "/images/about-images/dhule.jpg", lname: "Dhule" },
    { id: 3, img: "/images/about-images/satara.jpg", lname: "Satara" },
    { id: 4, img: "/images/about-images/nashik.jpg", lname: "Nashik" },
  ];

  return (
    <>
      <div className="pt-8">
        <Container>
          <div className="mx-auto max-w-5xl">
            {/* Our Journey + Image */}
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/2 p-8 bg-[#ffd670]/40 rounded-2xl flex flex-col justify-around items-center">
                <div>
                  <h1 className="text-2xl font-black text-[#31393c] uppercase">
                    OUR JOURNEY
                  </h1>
                  <p className="text-base text-[#2e1f27] mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    facere ipsa saepe. Distinctio vitae maiores doloremque, est,
                    quia atque nulla quod blanditiis repellendus quos quae?
                  </p>
                </div>

                <div>
                  <h1 className="text-2xl font-black text-[#31393c] uppercase">
                    OUR MISSION
                  </h1>
                  <p className="text-base text-[#2e1f27] mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    facere ipsa saepe. Distinctio vitae maiores doloremque.
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <img
                  src="/images/about-images/about-image.jpg"
                  className="rounded-2xl w-[590px] h-[550px] object-cover"
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-azure my-20 py-10 px-6 rounded-2xl bg-[#a8dcd1]/50">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {numarr.map((val) => (
                    <div key={val.id} className="text-center">
                      <h1 className="text-5xl font-bold text-orange-600">
                        {val.num}
                      </h1>
                      <h5 className="text-lg font-semibold mt-2">{val.word}</h5>
                      <p className="text-[#2e1f27] mt-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Founder Section */}
            <div className="container my-20 mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src="/images/about-images/person.jpg"
                    className="rounded-2xl w-[590px] h-[550px] object-cover"
                  />
                </div>

                <div className="md:w-1/2 p-8 bg-[#7fb069]/40 rounded-2xl flex flex-col justify-around items-center">
                  <div>
                    <h1 className="text-2xl uppercase font-black text-[#31393c]">
                      Meet Our Founder
                    </h1>
                    <p className="text-base text-[#2e1f27] mt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      facere ipsa saepe. Distinctio vitae maiores doloremque.
                    </p>
                  </div>

                  <div>
                    <h1 className="text-2xl uppercase font-black text-[#31393c]">
                      Leadership & Expertise
                    </h1>
                    <p className="text-base text-[#2e1f27] mt-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      facere ipsa saepe. Distinctio vitae maiores doloremque.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Values Section */}
            <div className="shadow-md my-20 py-8 px-4 rounded-2xl bg-[#a8dcd1]/50">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
                  {values.map((val) => (
                    <div key={val.id}>
                      <span className="inline-flex items-center justify-center bg-yellow-400 rounded-full p-4">
                        <img src={val.img} className="h-10" />
                      </span>
                      <h4 className="mt-4 font-semibold text-lg text-[#31393c]">
                        {val.heading}
                      </h4>
                      <p className="text-sm text-[#2e1f27] mt-2">{val.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Locations Section */}
            <div className="container mx-auto my-12 p-8 bg-[#8ecae6]/40 rounded-2xl">
              <h1 className="text-2xl font-bold">Our Locations</h1>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
                {locations.map((val) => (
                  <div key={val.id} className="text-center">
                    <img
                      src={val.img}
                      className="rounded-xl h-[200px] w-full object-cover mx-auto"
                    />
                    <span className="text-base font-semibold text-[#2e1f27] block mt-3">
                      {val.lname}
                    </span>
                  </div>
                ))}
              </div>

              <div className="my-20">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold">Why Choose Us</h1>
                  <p className="text-gray-600 mt-2 max-w-xl mx-auto">
                    We strive to provide exceptional service with unmatched
                    dedication, quality, and customer satisfaction.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-8 flex justify-center">
              <h1 className="text-2xl font-bold underline underline-offset-8">
                OUR SHOWCASE
              </h1>
            </div>
            <div className="p-2 rounded-3xl bg-gray-400/30">
              <div className="p-5 rounded-2xl bg-[#283618]/40">
                <BentoGrid className="max-w-6xl mx-auto" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About;
