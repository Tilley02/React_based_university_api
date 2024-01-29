import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewCohort() {
   const [cohortId, setCohortId] = useState("");
   const [cohortYear, setCohortYear] = useState("");
   const [cohortDegree, setCohortDegree] = useState("");
   const [degreeList, setDegreeList] = useState([]);
   const navigate = useNavigate();

   // Makes an array of degrees to be picked from in form
   useEffect(() => {
      fetch("http://127.0.0.1:8000/api/degree/")
         .then((response) => response.json())
         .then((data) => setDegreeList(data))
            .catch((error) => console.log(error));
    }, []);

   // For updating the page when a new cohort is entered
   const handleCohortIdChange = (e) => {
      setCohortId(e.target.value);
   };
   const handleCohortYearChange = (e) => {
      setCohortYear(e.target.value);
   };
   const handleCohortDegreeChange = (e) => {
      setCohortDegree(e.target.value);
   };


   // For when the form is submitted
   const handleSubmit = (e) => {
      e.preventDefault();

      // Makes sure no boxes are left blank
      if (!cohortId || !cohortYear || !cohortDegree || !degreeList) {
         alert("Please fill in all fields.");
         return;
      }

      // Check if cohortYear is greater than 4
      if (cohortYear > 4) {
         alert("Year should be less than or equal to 4.");
         return;
      }

      // Print information to console, to check in correct format
      console.log({
         id: cohortId,
         year: cohortYear,
         degree: cohortDegree
      });

      // Create name variable as a var so it can be changed, then checks what year the degree is in to set name to it
      var name = "";
      if (cohortYear === 1) {
         name = `1st year ${degreeList.full_name}`
      }
      else if (cohortYear === 2) {
         name = `2nd year ${degreeList.full_name}`
      }
      else if (cohortYear === 3) {
         name = `3rd year ${degreeList.full_name}`
      }
      else {
         name = `4th year ${degreeList.full_name}`
      }


      // Fetch method to post info to cohort api endpoint
      fetch('http://127.0.0.1:8000/api/cohort/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         id: cohortId,
         year: cohortYear,
         degree: `http://127.0.0.1:8000/api/degree/${cohortDegree}/`,
         name: name
        })
      })
      .then(response => response.json())
      .then(data => {

        // Reset form fields
        setCohortId("");
        setCohortYear("");
        setCohortDegree("");

        // Returns to cohorts page after submitting form
        navigate("/cohort");
      })
    }

   return (
      <div style={{ padding: "20px" }}>
      <h1>Create New Cohort</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Cohort ID:
          <input type="text" value={cohortId} onChange={handleCohortIdChange} style={{ marginLeft: "10px" }}/>
        </label>
        <br />
        <label style={{ display: "block", marginBottom: "10px" }}>
          Year (Up to 4):
          <input type="number" value={cohortYear} maxLength={1} onChange={handleCohortYearChange} style={{ marginLeft: "10px" }}/>
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Degree:
            <select value={cohortDegree} onChange={handleCohortDegreeChange}>
               <option value="">Select a degree</option>
               {degreeList.map((degree) => (
                  <option key={degree.shortcode} value={degree.shortcode}>
                  {degree.shortcode}
               </option>
               ))}
            </select>
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
          }}>Make Cohort</button>
      </form>
      <br />
      <button
        onClick={() => navigate("/cohort")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>View Cohorts</button>
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

export default NewCohort;
