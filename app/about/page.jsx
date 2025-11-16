import Container from "@/app/components/Container";

const About = () => {
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
    { id: 1, img: "/images/about-images/ichalkaranji.jpg", lname: "Ichalkaranji" },
    { id: 2, img: "/images/about-images/dhule.jpg", lname: "Dhule" },
    { id: 3, img: "/images/about-images/satara.jpg", lname: "Satara" },
    { id: 4, img: "/images/about-images/nashik.jpg", lname: "Nashik" },
  ];

  return (
    <>
    <Container>
     

      {/* Our Journey + Image */}
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2">
            <h1 className="mt-28 text-2xl font-bold">Our Journey</h1>
            <p className="text-base text-gray-600 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. facere
              ipsa saepe. Distinctio vitae maiores doloremque, est, quia atque
              nulla quod blanditiis repellendus quos quae?
            </p>

            <h1 className="mt-16 text-2xl font-bold">Our Mission</h1>
            <p className="text-base text-gray-600 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. facere
              ipsa saepe. Distinctio vitae maiores doloremque.
            </p>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/about-images/about-image.jpg"
              className="rounded-2xl w-[590px] h-[550px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-azure mt-10 py-10 bg-[#F0FFFF]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {numarr.map((val) => (
              <div key={val.id} className="text-center">
                <h1 className="text-5xl font-bold text-orange-600">
                  {val.num}
                </h1>
                <h5 className="text-lg font-semibold mt-2">{val.word}</h5>
                <p className="text-gray-500 mt-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="container mx-auto mt-10 px-4">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/about-images/person.jpg"
              className="rounded-2xl w-[590px] h-[550px] object-cover"
            />
          </div>

          <div className="md:w-1/2">
            <h1 className="mt-28 text-2xl font-bold">Meet Our Founder</h1>
            <p className="text-base text-gray-600 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. facere
              ipsa saepe. Distinctio vitae maiores doloremque.
            </p>

            <h1 className="mt-16 text-2xl font-bold">Leadership & Expertise</h1>
            <p className="text-base text-gray-600 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. facere
              ipsa saepe. Distinctio vitae maiores doloremque.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="my-14 bg-gray-200/40 shadow-md py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
            {values.map((val) => (
              <div key={val.id}>
                <span className="inline-flex items-center justify-center bg-yellow-400 rounded-full p-5">
                  <img src={val.img} className="h-14" />
                </span>
                <h4 className="mt-4 font-semibold text-lg">{val.heading}</h4>
                <p className="text-sm text-gray-600 px-2 mt-2">{val.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Locations Section */}
      <div className="container mx-auto my-12 px-4">
        <h1 className="text-2xl font-bold">Our Locations</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10">
          {locations.map((val) => (
            <div key={val.id} className="text-center">
              <img
                src={val.img}
                className="rounded-xl h-[200px] w-full object-cover mx-auto"
              />
              <span className="text-base font-semibold text-gray-600 block mt-3">
                {val.lname}
              </span>
            </div>
          ))}
        </div>

        <div className="py-10"></div>
      </div>
    </Container>
    </>
  );
};

export default About;
