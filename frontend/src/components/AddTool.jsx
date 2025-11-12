import React, { useState } from "react";
import axios from "axios";

export default function AddTool() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rate, setRate] = useState("");

  const handleAddTool = async () => {
    if (!name || !image || !rate) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/items", {
        name,
        image,
        ratePerDay: rate,
      });
      alert(res.data.message);
      setName("");
      setImage("");
      setRate("");
    } catch (err) {
      alert("Error adding tool!");
      console.error(err);
    }
  };

  return (
    <div className="add-tool">
      <h2>Add a New Tool</h2>
      <input
        type="text"
        placeholder="Tool Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rate per Day"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <button onClick={handleAddTool}>Add Tool</button>
    </div>
  );
}
