import React, { useState } from "react";
import axios from "axios";

export default function BookingForm({ item, onClose }) {
  const [userName, setUserName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBook = async () => {
    await axios.post("http://localhost:5000/api/bookings", {
      itemId: item._id,
      userName,
      startDate,
      endDate,
    });
    alert("Booking created!");
    onClose();
  };

  return (
    <div className="booking-form">
      <h3>Book {item.name}</h3>
      <input
        type="text"
        placeholder="Your username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <label>Start Date:</label>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <label>End Date:</label>
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <button onClick={handleBook}>Confirm Booking</button>
      <button className="cancel-btn" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}
