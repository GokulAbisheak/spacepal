import React from "react";
import Moon from "../../assets/moon.png";
import ImageOfTheDay from "./ImageOfTheDay";
import AsteroidsNearEarth from "../AstroidsNearEarth";
import SpaceNotifications from "../SpaceNotifications";
import MarsRover from "../MarsRover";
import EnginePatentDetails from "../EnginePatentDetails";
import SoftwarePatentDetails from "../SoftwarePatentDetails";
import MarsWeather from "../MarsWeather";
import EarthImage from "../EarthImage";
import AboutUs from "./AboutUs"
import Loading from "../../components/Loading";

const Home = () => {
  const scrollToImageOfTheDay = () => {
    const imageOfTheDaySection = document.getElementById("image-of-the-day");
    if (imageOfTheDaySection) {
      imageOfTheDaySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="h-screen w-[100vw] relative top-0 overflow-hidden bg-black">
        <img className="moon" src={Moon} alt="" />
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <div className="text-white z-50 absolute top-[50%] left-[10%] translate-y-[-50%]">
          <div className="font-bold text-5xl">Welcome to SpacePal</div>
          <div className="text-lg">Explore the space for free!</div>
            <button onClick={scrollToImageOfTheDay} className="uppercase bg-red-700 hover:bg-red-800 duration-200 font-bold py-3 px-6 rounded mt-5">
              Explore now
            </button>
        </div>
      </div>
      <ImageOfTheDay />
      <AboutUs />
    </>
  );
};

export default Home;
