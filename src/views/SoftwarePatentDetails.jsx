import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../components/Input"
import Loading from "../components/Loading";

const SoftwarePatentDetails = () => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [patents, setPatents] = useState([]);
  const [displayedPatents, setDisplayedPatents] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatents();
  }, []);

  const fetchPatents = async () => {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/techtransfer/patent/?software&api_key=${API_KEY}`
      );
      setPatents(response.data.results);
    } catch (error) {
      console.error("Error fetching patents:", error);
    }
    setLoading(false);
  };

  const handleViewMore = () => {
    setDisplayedPatents((prev) => prev + 9);
  };

  const handleShowLess = () => {
    setDisplayedPatents((prev) => Math.max(prev - 9, 9));
  };

  const filteredPatents = patents.filter(
    (patent) =>
      patent[2].toLowerCase().includes(searchTerm.toLowerCase()) ||
      patent[3].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="p-8 pt-32 min-h-screen">
      <h1 className="text-5xl font-bold mb-4">Patents related to Softwares</h1>
      <input
        type="text"
        placeholder="Search Software Patents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatents.slice(0, displayedPatents).map((patent) => (
          <li key={patent[0]} className="border rounded overflow-hidden shadow-lg">
            <img className="w-full" src={patent[10]} alt={patent[2]} />
            <div className="px-6 py-4">
              <div
                className="font-bold text-xl mb-2"
                dangerouslySetInnerHTML={{ __html: patent[2] }}
              />
              <p className="text-gray-700 text-base" dangerouslySetInnerHTML={{ __html: patent[3] }} />
              <p className="text-gray-700 text-base font-bold pt-2">Center: {patent[9]}</p>
            </div>
          </li>
        ))}
      </ul>
      {displayedPatents < filteredPatents.length && (
        <button
          onClick={handleViewMore}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          View More
        </button>
      )}
      {displayedPatents > 9 && (
        <button
          onClick={handleShowLess}
          className="mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded"
        >
          Show Less
        </button>
      )}
    </div>
    {loading ? <Loading /> : <></>}
    </>
  );
};

export default SoftwarePatentDetails;
