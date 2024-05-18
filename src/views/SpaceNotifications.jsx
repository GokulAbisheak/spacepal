import React, { useState, useEffect } from "react";
import axios from "axios";

const SpaceNotifications = () => {
  const API_KEY = import.meta.env.VITE_NASA_API_KEY;

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://api.nasa.gov/DONKI/notifications?startDate=2024-01-01&endDate=2024-01-08&type=all&api_key=${API_KEY}`
        );
        setNotifications(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
        setError("Error fetching notifications. Please try again.");
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Space Weather Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.messageID}>
            <strong>Type:</strong> {notification.messageType},{" "}
            <strong>Date:</strong> {notification.messageIssueTime},{" "}
            <strong>Description:</strong> {notification.messageBody}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpaceNotifications;
