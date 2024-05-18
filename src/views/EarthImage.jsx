import axios from "axios";
import React, { useState } from "react";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import Button from "../components/Button";
import Loading from "../components/Loading";

const EarthImage = () => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const [latitude, setLatitude] = useState("1.5");
  const [longitude, setLongitude] = useState("100.75");
  const [date, setDate] = useState("2014-02-01");
  const [dimensions, setDimensions] = useState(0.15);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)

    if (!latitude || !longitude || !date) {
      setError("Please enter latitude, longitude, and date.");
      return;
    }

    axios
      .get(
        `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=${date}&dim=${dimensions}&api_key=${API_KEY}`
      )
      .then((res) => {
        console.log(res);
        setImageUrl(res.data.url);
        setError("");
      })
      .catch((err) => {
        setError(err);
      });

    setLoading(false);
  };

  return (
    <>
      <div className="p-8 pt-32 min-h-screen">
        <h1 className="font-bold text-5xl mb-8">NASA Earth Imagery</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 w-full justify-center">
            <div>
              <Input
                label="Latitude"
                type="number"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                step="0.0000001"
              />
            </div>
            <div>
              <Input
                label="Longitude"
                type="number"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                step="0.0000001"
              />
            </div>
            <div>
              <DateInput
                label="Date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <Input
                label="Dimensions"
                type="number"
                id="dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                step="0.001"
              />
            </div>
            <Button
              className="mt-4 bg-sky-600 hover:bg-sky-700 text-white duration-200"
              type="submit"
            >
              Get Image
            </Button>
          </div>
        </form>
        {error && <p>{error}</p>}
        {imageUrl && (
          <img
            className="mt-8 mx-auto w-[600px]"
            src={imageUrl}
            alt="Earth Imagery"
          />
        )}
      </div>
      {loading ? <Loading /> : <></>}
    </>
  );
};

export default EarthImage;
