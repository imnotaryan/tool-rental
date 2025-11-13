import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "../components/BookingForm";
import styles from "../components/Home.module.css";

export default function Home() {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios.get("https://tool-rental.onrender.com/api/items").then((res) => {
      console.log(res.data)
      setTools(res.data);
    });
  }, []);

  return (
    <div className={styles["home-container"]}>
      <div className={styles.header}>
        <h1>🔧 Tool & Equipment Rentals</h1>
        <p>Find and rent the right tool for your job — fast and affordable!</p>
      </div>

      <div className={styles["tools-grid"]}>
        {tools.map((item) => (
          <div key={item._id} className={styles["tool-card"]}>
            <img src={item.image} alt={item.name} />
            <div className={styles["tool-info"]}>
              <h3>{item.name}</h3>
              <p className={styles.price}>₹{item.ratePerDay}/day</p>
              <p>
                Status:{" "}
                {item.available ? (
                  <span style={{ color: "#00b894" }}>Available</span>
                ) : (
                  <span style={{ color: "red" }}>Booked</span>
                )}
              </p>
            </div>
            {item.available && user && (
              <button
                className={styles["book-btn"]}
                onClick={() => setSelectedTool(item)}
              >
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedTool && (
        <BookingForm
          item={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
}
