import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewDegree() {
  const [degreeName, setdegreeName] = useState();
  const [degreeShortCode, setdegreeShortCode] = useState();
  const navigate = useNavigate();

  const handleDegreeNameChange = (e) => {
    setdegreeName(e.target.value);
  };
  const handleDegreeCodeChange = (e) => {
    setdegreeShortCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!degreeName || !degreeShortCode) {
      alert("Please fill in all fields.");
      return;
    }

    if (degreeShortCode.length > 5) {
      alert("Course Code cannot be more than 5 characters");
      return;
    }

    fetch("http://127.0.0.1:8000/api/degree/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: degreeName,
        shortcode: degreeShortCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setdegreeName("");
        setdegreeShortCode("");
        navigate("/degree");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create New Degree</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Degree Name:
          <input type="text" value={degreeName} onChange={handleDegreeNameChange}
            style={{ marginLeft: "10px" }}/>
        </label>
        <br />
        <label style={{ display: "block", marginBottom: "10px" }}>
          Course Code (Max Length of 5 Characters):
          <input type="text" value={degreeShortCode} maxLength={5} onChange={handleDegreeCodeChange}
            style={{ marginLeft: "10px" }}/>
        </label>
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>Create Degree</button>
      </form>
      <br />
      <button
        onClick={() => navigate("/degree")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>View Degrees</button>
      <br />
      <br />
      <br />
      <button
        onClick={() => navigate("/")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>Return to Home</button>
    </div>
  );
}

export default NewDegree;
