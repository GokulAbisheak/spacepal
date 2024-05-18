// import React from "react";

// const AboutUs = () => {
//   return (
//     <div className="p-16 pt-32">
//       <h1 className="text-4xl font-semibold mb-4">About Us</h1>
//       <div className="text-gray-700">
//         <p className="mb-4">
//           Welcome to <span className="font-bold">SpacePal</span>! We are a free website dedicated to bringing you the latest and most exciting space-related content. Our mission is to provide accessible and engaging information about space technology, research, and discoveries.
//         </p>
//         <p className="mb-4">
//           At SpacePal, we harness the power of NASA's API to deliver a wealth of data and resources. This includes information on space missions, patents, technological innovations, and much more. Our goal is to inspire and educate space enthusiasts, students, researchers, and anyone with a curiosity about the universe.
//         </p>
//         <p className="mb-4">
//           Our website features a variety of space-related content, including:
//         </p>
//         <ul className="list-disc list-inside mb-4">
//           <li>Latest news and updates from NASA</li>
//           <li>Detailed information on NASA patents and technologies</li>
//           <li>Educational resources and articles about space science</li>
//           <li>Stunning images and media from space missions</li>
//         </ul>
//         <p className="mb-4">
//           SpacePal is powered by the NASA API, which allows us to access a vast repository of space-related data. We are committed to providing accurate and up-to-date information, and we continually strive to enhance our website with new features and content.
//         </p>
//         <p className="mb-4">
//           Thank you for visiting SpacePal. We hope you enjoy exploring the wonders of space with us. If you have any questions, suggestions, or feedback, please feel free to reach out to us.
//         </p>
//         <p className="font-bold">Contact Us:</p>
//         <p>Email: <a href="mailto:gokulabishak12@gmail.com" className="text-blue-500">gokulabishak12@gmail.com</a></p>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import axios from "axios";
import React, { useEffect, useState } from "react";
import AstroImg from "../../assets/astro.jpg"

const AboutUs = () => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const [imageData, setImageData] = useState();

  useEffect(() => {
    axios
      .get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then((res) => {
        setImageData(res.data);
      })
      .catch((err) => {
        console.error("Cannot GET Image of the Day", err);
      });
  }, []);

  return (
    <>
      <div
        id="image-of-the-day"
        className="min-h-screen w-full flex justify-between"
      >
        <div className="w-1/2 p-[100px] flex justify-center items-center">
          <div className="w-[500px] h-[500px] bg-neutral-300">
            <img src={AstroImg} className="object-scale" />
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center p-[50px]">
          <div className="w-full">
            <div className="text-5xl font-bold pb-8">About Us</div>
            <p className="mb-4">
              Welcome to <span className="font-bold">SpacePal</span>! We are a
              free website dedicated to bringing you the latest and most
              exciting space-related content. Our mission is to provide
              accessible and engaging information about space technology,
              research, and discoveries.
            </p>
            <p className="mb-4">
              At SpacePal, we harness the power of NASA's API to deliver a
              wealth of data and resources. This includes information on space
              missions, patents, technological innovations, and much more. Our
              goal is to inspire and educate space enthusiasts, students,
              researchers, and anyone with a curiosity about the universe.
            </p>
            <p className="mb-4">
              Our website features a variety of space-related content,
              including:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Latest news and updates from NASA</li>
              <li>Detailed information on NASA patents and technologies</li>
              <li>Educational resources and articles about space science</li>
              <li>Stunning images and media from space missions</li>
            </ul>
            <p className="mb-4">
              Thank you for visiting SpacePal. We hope you enjoy exploring the
              wonders of space with us. If you have any questions, suggestions,
              or feedback, please feel free to reach out to us.
            </p>
            <p className="font-bold">Contact Us:</p>
            <p>
              Email:{" "}
              <a
                href="mailto:gokulabishak12@gmail.com"
                className="text-blue-500"
              >
                gokulabishak12@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
