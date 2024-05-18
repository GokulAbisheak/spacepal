import axios from "axios";
import React, { useState, useEffect } from "react";
import DateInput from "../components/DateInput";
import Loading from "../components/Loading";

function MarsRover() {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [photos, setPhotos] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2023-12-12");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedDate) {
      fetchPhotos(selectedDate);
    }
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const fetchPhotos = async (date) => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&page=1&api_key=${API_KEY}`
      );
      setPhotos(response.data.photos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-8 pt-32">
        <div className="text-5xl font-bold">Mars Rover Photos</div>
        <div className="my-4">
          <DateInput
            label="Select Date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {photos && photos.length ? (
            photos.map((photo) => (
              <div
                key={photo.id}
                className="rounded overflow-hidden border border-gray-300 shadow-md"
              >
                <img
                  src={photo.img_src}
                  alt={`Photo taken by ${photo.camera.full_name} on ${photo.earth_date}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-700 text-sm">{photo.earth_date}</p>
                  <p className="text-gray-900 font-semibold">
                    {photo.camera.full_name}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="pt-2 text-red-600">
              No photos available for the requested date
            </div>
          )}
        </div>
      </div>
      {loading ? <Loading /> : <></>}
    </>
  );
}

export default MarsRover;
