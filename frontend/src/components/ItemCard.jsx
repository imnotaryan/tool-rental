import React from "react";
import axios from "axios";
import "./ItemCard.css";

const ItemCard = ({ item, onBook }) => {
  const user = JSON.parse(localStorage.getItem("user")); // ✅ check if logged in

  const handleBook = async () => {
    if (!user) {
      alert("Please login to book this item!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        itemId: item._id,
        userId: user._id,
      });
      alert("Booking successful!");
      if (onBook) onBook();
    } catch (error) {
      alert("Failed to book item.");
    }
  };

  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Rate: ₹{item.rate}/day</p>
      <p>Available: {item.available ? "Yes" : "No"}</p>

      {/* ✅ Disable Book button if not logged in */}
      <button
        className="book-btn"
        onClick={handleBook}
        disabled={!user || !item.available}
      >
        {!user ? "Login to Book" : !item.available ? "Not Available" : "Book Now"}
      </button>
    </div>
  );
};

export default ItemCard;
