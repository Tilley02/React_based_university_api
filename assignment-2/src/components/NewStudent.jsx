import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewStudent() {
   const [studentId, setStudentId] = useState("");
   const [studentFName, setStudentFName] = useState("");
   const [studentLName, setStudentLName] = useState("");
   const [cohort, setCohort] = useState("");
   const [cohortList, setCohortList] = useState([]);
   const navigate = useNavigate();

   // Makes an array of cohorts to be picked from in form
   useEffect(() => {
      fetch("http://127.0.0.1:8000/api/cohort/")
        .then((response) => response.json())
        .then((data) => setCohortList(data))
        .catch((error) => console.log(error));
    }, []);

   // For updating the page when a new cohort is entered
   const handleStudentIdChange = (e) => {
      setStudentId(e.target.value);
   };
   const handleStudentFNameChange = (e) => {
      setStudentFName(e.target.value);
   };
   const handleStudentLNameChange = (e) => {
      setStudentLName(e.target.value);
   };
   const handleStudentCohortChange = (e) => {
      setCohort(e.target.value);
   };


   // For when the form is submitted
   const handleSubmit = (e) => {
      e.preventDefault();

      // Makes sure no boxes are left blank
      if (!studentId || !studentFName || !studentLName || !cohort || !cohortList) {
         alert("Please fill in all fields.");
         return;
      }

      if (studentId.length > 8) {
         alert("Studen ID can only be max 8 digits");
         return;
      }

      // Print information to console
      console.log({
         student_id: studentId,
         first_name: studentFName,
         last_name: studentLName,
         cohort: cohort,
         email: `${studentFName}.${studentLName}@dcu.ie`
      });


      // For sending info to student api endpoint
      fetch('http://127.0.0.1:8000/api/student/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         student_id: studentId,
         first_name: studentFName,
         last_name: studentLName,
         cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
         email: `${studentFName}.${studentLName}@dcu.ie`
        })
      })
      .then(response => response.json())
      .then(data => {

        // Reset form fields
        setStudentId("");
        setStudentFName("");
        setStudentLName("");
        setCohort("");

        // Returns to degrees page after submitting form
        navigate("/student");
      })
    }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <br />
            <label>
               Student ID: <input type="number" maxLength={8} value={studentId} onChange={handleStudentIdChange}/>
            </label>
            <br />
            <br />
            <label>
               First Name: <input type="text" value={studentFName} onChange={handleStudentFNameChange}/>
            </label>
            <br />
            <br />
            <label>
               Last Name: <input type="text" value={studentLName} onChange={handleStudentLNameChange}/>
            </label>
            <br />
            <br />
            <label>
               {/* Makes an array of cohorts to chose from for the student */}
               Cohort:
               <select value={cohort} onChange={handleStudentCohortChange}>
                  <option value="">Select a cohort</option>
                  {cohortList.map((cohort) => (
                     <option key={cohort.id} value={cohort.id}>
                     {cohort.id}
                  </option>
                  ))}
               </select>
            </label>
            <br />
            <br />
            <button type="submit">Make Student</button>
         </form>
         <br />
         {/* If user wants to search for a student instead of creating one */}
         <button onClick={() => navigate("/student")}>Search for Student</button>
         <br />
         <br />
         {/* Button to return home */}
         <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
   );
}

export default NewStudent;
