import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user?.username) {
      axios
        .get(`http://localhost:5000/api/bookings/user/${user.username}`)
        .then((res) => {
          setBookings(res.data.bookings || []);
          setItems(res.data.itemList || []);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const getItemDetails = (itemId) => {
    return items.find((item) => item._id === itemId);
  };
  console.log(bookings)
  console.log(items)
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{user?.username}'s Bookings</h2>

      {bookings.length === 0 ? (
        <p style={styles.empty}>No bookings found.</p>
      ) : (
        <div style={styles.grid}>
          {bookings.map((b) => {
            const item = getItemDetails(b.itemId);
            return (
              <div key={b._id} style={styles.card}>
                <h3 style={styles.itemName}>{item?.name || "Unknown Item"}</h3>
                <p><strong>Rate:</strong> ₹{item?.ratePerDay || "N/A"} / {item?.rateType || "day"}</p>
                <p>
  <strong>Date:</strong>{" "}
  {b.startDate && b.endDate
    ? `${new Date(b.startDate.trim()).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })} → ${new Date(b.endDate.trim()).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}`
    : "N/A"}
</p>

                <p><strong>Status:</strong> {b.status}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px", color: "#333" },
  heading: { textAlign: "center", color: "#2a2a72" },
  empty: { textAlign: "center", color: "#999", marginTop: "20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "#f9f9ff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
  itemName: { color: "#1b1b6f", marginBottom: "8px" },
};

export default Bookings;
