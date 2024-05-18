import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../views/Home";
import AboutUs from "../views/Home/AboutUs";
import AsteroidsNearEarth from "../views/AstroidsNearEarth";
import SoftwarePatentDetails from "../views/SoftwarePatentDetails";
import EnginePatentDetails from "../views/EnginePatentDetails";
import MarsRover from "../views/MarsRover";
import EarthImage from "../views/EarthImage";
import Login from "../views/Login";
import Register from "../views/Register";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/asteroids-near-me" element={<AsteroidsNearEarth />} />
            <Route
              path="/patents/software"
              element={<SoftwarePatentDetails />}
            />
            <Route path="/patents/engine" element={<EnginePatentDetails />} />
            <Route path="/mars-rover-photos" element={<MarsRover />} />
            <Route path="/earth-imagery" element={<EarthImage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;
