import React, { useState, useEffect } from "react";

const MarsWeather = () => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`
        );
        const data = await response.json();
        const latestSol = data.sol_keys[0];
        setWeatherData(data[latestSol]);
      } catch (error) {
        setError(error);
      }
    };

    fetchWeatherData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

//   if (!weatherData) {
//     return <div>Loading...</div>;
//   }

  return (
    <div>
      <h2>Mars Weather</h2>
      <p>
        <strong>Season:</strong> {weatherData.Season}
      </p>
      <p>
        <strong>Average Temperature:</strong> {weatherData.AT.av} °C
      </p>
      <p>
        <strong>Average Pressure:</strong> {weatherData.PRE.av} Pa
      </p>
      <p>
        <strong>Average Wind Speed:</strong> {weatherData.HWS.av} m/s
      </p>
      <p>
        <strong>Most Common Wind Direction:</strong>{" "}
        {weatherData.WD.most_common.compass_point}
      </p>
    </div>
  );
};

export default MarsWeather;
