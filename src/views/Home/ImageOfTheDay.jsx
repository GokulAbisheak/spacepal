import axios from "axios";
import React, { useEffect, useState } from "react";

const ImageOfTheDay = () => {
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
      <div id="image-of-the-day" className="min-h-screen w-full flex justify-between">
        <div className="w-1/2 p-[100px]">
            <div className="text-5xl font-bold pb-8">Image of the Day</div>
            <div className="text-3xl font-bold pb-2">{imageData && imageData.title ? imageData.title : ''}</div>
            <div className="">{imageData && imageData.explanation ? imageData.explanation : ''}</div>
        </div>
        <div className="w-1/2 flex justify-center items-center p-[100px]">
          <div className="bg-neutral-300 w-[500px] h-[500px]">
            <img src={imageData && imageData.url ? imageData.url : ''} className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageOfTheDay;
