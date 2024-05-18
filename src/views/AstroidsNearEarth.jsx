import React, { useState, useEffect } from "react";
import axios from "axios";
import asteroidImage from "../assets/asteroid.png";
import DateInput from "../components/DateInput";
import Dropdown from "../components/Dropdown";
import Loading from "../components/Loading";

const AsteroidsNearEarth = () => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const [startDate, setStartDate] = useState("2024-05-16");
  const [endDate, setEndDate] = useState("2024-05-23");
  const [asteroids, setAsteroids] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("kilometers");
  const [error, setError] = useState("");
  const [hoveredAsteroid, setHoveredAsteroid] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAsteroids();
  }, [startDate, endDate]);

  const fetchAsteroids = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`
      );
      const { near_earth_objects } = response.data;
      const asteroidsData = Object.values(near_earth_objects).flat();
      setAsteroids(asteroidsData);
      setError("");
    } catch (error) {
      console.error("Error fetching asteroids:", error);
    }
    setLoading(false)
  };

  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (
      new Date(endDate) - new Date(e.target.value) >
      7 * 24 * 60 * 60 * 1000
    ) {
      setError("End date should be within 7 days of the start date.");
    } else {
      setError("");
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    if (
      new Date(e.target.value) - new Date(startDate) >
      7 * 24 * 60 * 60 * 1000
    ) {
      setError("End date should be within 7 days of the start date.");
    } else {
      setError("");
    }
  };

  const calculateAverageDiameter = (asteroid) => {
    const minDiameter =
      asteroid.estimated_diameter[selectedUnit].estimated_diameter_min;
    const maxDiameter =
      asteroid.estimated_diameter[selectedUnit].estimated_diameter_max;
    return ((minDiameter + maxDiameter) / 2).toFixed(2);
  };

  const calculateWidth = (asteroid) => {
    const minDiameter =
      asteroid.estimated_diameter.meters.estimated_diameter_min;
    const maxDiameter =
      asteroid.estimated_diameter.meters.estimated_diameter_max;
    return (minDiameter + maxDiameter) / 2;
  };

  const unitOptions = [
    { name: "Kilometers", value: "kilometers" },
    { name: "Meters", value: "meters" },
    { name: "Miles", value: "miles" },
    { name: "Feet", value: "feet" },
  ];

  const handleShowMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 20);
  };

  const handleShowLess = () => {
    setDisplayLimit((prevLimit) => prevLimit - 20);
  };

  return (
    <>
    <div className="p-8 pt-32 min-h-screen">
      <h1 className="text-5xl font-bold">Asteroids Near Earth</h1>
      <div className="pt-10">
        <div className="flex gap-8">
          <DateInput
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
            inputFormat="MM/dd/yyyy"
            label="Start Date"
          />
          <DateInput
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
            inputFormat="MM/dd/yyyy"
            label="End Date"
          />
          <Dropdown
            label="Select Unit"
            id="unit"
            onChange={handleUnitChange}
            option={unitOptions}
          />
        </div>
        <div className="pb-8 pt-2 text-red-600">
          {error && <p>{error}</p>}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {asteroids.slice(0, displayLimit).map((asteroid) => (
          <div
            key={asteroid.id}
            className="shadow-[0px_0px_5px_0px_rgba(0,0,0,0.5)] rounded p-3"
          >
            {hoveredAsteroid === asteroid && (
              <>
                <div
                  className="shadow flex flex-col items-center justify-center p-5 absolute bg-white rounded"
                  onMouseEnter={() => setHoveredAsteroid(asteroid)}
                  onMouseLeave={() => setHoveredAsteroid(null)}
                >
                  <img
                    src={asteroidImage}
                    alt="Asteroid"
                    style={{
                      width: calculateWidth(asteroid),
                      height: "auto",
                    }}
                  />
                  <div className="font-bold">Scale (1px : 1m)</div>
                </div>
              </>
            )}
            <h2 className="font-bold">{asteroid.name}</h2>
            <p>
              Average Diameter: {calculateAverageDiameter(asteroid)}{" "}
              {selectedUnit}
            </p>
            <p>
              Close Approach Date:{" "}
              {asteroid.close_approach_data[0].close_approach_date}
            </p>
            <div className="flex justify-between items-end">
              <button
                onMouseEnter={() => setHoveredAsteroid(asteroid)}
                onMouseLeave={() => setHoveredAsteroid(null)}
                className="p-2 bg-sky-600 rounded text-white mt-5"
              >
                Show Asteroid Size
              </button>
              {asteroid.is_potentially_hazardous_asteroid ? (
                <div className="bg-red-600 rounded-full text-white px-2">
                  Potential Risk
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        {displayLimit < asteroids.length && (
          <button
            onClick={handleShowMore}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Show More
          </button>
        )}
        {displayLimit > 20 && (
          <button
            onClick={handleShowLess}
            className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
    {loading ? <Loading /> : <></>}
    </>
  );
};

export default AsteroidsNearEarth;
