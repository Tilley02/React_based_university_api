import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewModule() {
   const [moduleCode, setModuleCode] = useState("");
   const [moduleFullName, setModuleFullName] = useState("");
   const [moduleDeliveredTo, setModuleDeliveredTo] = useState([]);
   const [moduleDeliveredToList, setModuleDeliveredToList] = useState([]);
   const [moduleCaSplit, setModuleCaSplit] = useState("");
   const navigate = useNavigate();

   // Makes an array of cohorts to be picked from in form
   useEffect(() => {
      fetch("http://127.0.0.1:8000/api/cohort/")
        .then((response) => response.json())
        .then((data) => setModuleDeliveredToList(data))
        .catch((error) => console.log(error));
    }, []);

   // For updating the page when a new cohort is entered
   const handleModuleCodeChange = (e) => {
      setModuleCode(e.target.value);
   };
   const handleModuleFullNameChange = (e) => {
      setModuleFullName(e.target.value);
   };
   // Gets cohort id and cohort course code, applied when a box it ticked or unticked, constructs a url of modules to cohorts
   const handleModuleDeliveredToChange = (e) => {
      const cohortId = e.target.value;
      const cohortUrl = `http://127.0.0.1:8000/api/cohort/${cohortId}/`;
    
      if (e.target.checked) {
        // For if only cohort selected
        if (moduleDeliveredTo.length === 0) {
          setModuleDeliveredTo([cohortUrl]);
        }
      }
      else {
        setModuleDeliveredTo((prev) =>
          prev.filter((url) => url !== cohortUrl)
        );
      }
    };
   const handleModuleCaSplitChange = (e) => {
      setModuleCaSplit(parseInt(e.target.value));
   };

   // For when the form is submitted
   const handleSubmit = (e) => {
      e.preventDefault();

      // Makes sure no boxes are left blank
      if (!moduleCode || !moduleFullName || !moduleDeliveredTo || !moduleDeliveredToList || !moduleCaSplit) {
         alert("Please fill in all fields. If Ca Split was 0 refresh page");
         return;
      }

      if (moduleCode.length > 5) {
        alert("Module Code cannot be more than 5 characters");
        return;
      }

      if (moduleCaSplit > 100) {
        alert("CA Split can only be max 100");
        return;
      }

      // Print information to console
      console.log({
         code: moduleCode,
         full_name: moduleFullName,
         delivered_to: moduleDeliveredTo.map(cohortId => `${cohortId}`),
         ca_split: moduleCaSplit
      });


      // Fetch method to post info user entered to api endpoint for module
      fetch("http://127.0.0.1:8000/api/module/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: moduleCode,
        full_name: moduleFullName,
        delivered_to: moduleDeliveredTo.map((cohortUrl) => cohortUrl), // Formats moduleDeliveredTo array as a list of Urls for the expected format of the api endpoint
        ca_split: moduleCaSplit,
      }),
      })
      .then(response => response.json())
      .then(data => {

        // Reset form fields
        setModuleCode("");
        setModuleFullName("");
        setModuleDeliveredTo([]);
        setModuleCaSplit("");

        // Returns to modules page after submitting form
        navigate("/module");
      })
    }

    return (
      <div style={{ padding: "20px" }}>
      <h1>Create New Module</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Module Code:
          <input type="text" maxLength={5} value={moduleCode} onChange={handleModuleCodeChange} style={{ marginLeft: "10px" }}/>
        </label>
        <br />
        <label style={{ display: "block", marginBottom: "10px" }}>
          Full Name:
          <input type="text" value={moduleFullName} onChange={handleModuleFullNameChange} style={{ marginLeft: "10px" }}/>
        </label>
        <label style={{ display: "block", marginBottom: "10px" }}>
          {/* Displays a list of cohorts to choose from to specify where the module is delivered to */}
          Delivered to (Choose one):
          {moduleDeliveredToList.map((cohort) => (
                <div key={cohort.id}>
                  <input type="checkbox" id={`cohort-${cohort.id}`} value={cohort.id} onChange={handleModuleDeliveredToChange} />
                  <label htmlFor={`cohort-${cohort.id}`}>{cohort.name}</label>
                </div>
              ))}
        </label>
        <br />
        <label style={{ display: "block", marginBottom: "10px" }}>
          CA Split:
          <input type="number" value={moduleCaSplit} onChange={handleModuleCaSplitChange} style={{ marginLeft: "10px" }}/>
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
          }}>Create Module</button>
      </form>
      <br />
      <button
        onClick={() => navigate("/module")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>View Modules</button>
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

export default NewModule;