import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentButton from "./StudentButton";

function Student() {
   const [studentId, setStudentId] = useState("");
   const [studentInfo, setStudentInfo] = useState();
   const [studentGrades, setStudentGrades] = useState([]);
   const [studentModules, setStudentModules] = useState([]);
   const navigate = useNavigate();

   const handleStudentIdChange = (e) => {
      setStudentId(e.target.value);
   };

   // For when the form is submitted
   const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch student data and grades
    Promise.all([
      fetch(`http://127.0.0.1:8000/api/student/${studentId}`).then((response) => response.json()),
      fetch(`http://127.0.0.1:8000/api/grade/?student=${studentId}`).then((response) => response.json())
    ])
      .then(([studentData, gradeData]) => {
        if (!studentData) {
          alert("Student does not exist. Enter a valid Student ID please");
          return;
        }

        setStudentInfo(studentData);
        setStudentGrades(gradeData);
        setStudentId("");

        // Gets student Cohort
        fetch(studentData.cohort)
          .then((response) => response.json())
          .then((cohortData) => {
            // Gets modules for that cohort then
            fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortData.id}`)
              .then((response) => response.json())
              .then((data) => {
                setStudentModules(data);
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };


    return (
      <div>
        {/* && checks studentInfo exists and is not null or empty */}
        {studentInfo && (
          <div>
            <h2>Student Info</h2>
            <p>Student Name: {studentInfo.first_name} {studentInfo.last_name}</p>
            <p>Cohort: {studentInfo.cohort.split('/')[5]}</p>
            <p>Email: {studentInfo.email}</p>
            <h3>Modules</h3>
            {studentModules.map((module) => (
              <p key={module.code}>Module: {module.code} -
              Module Name: {module.full_name}</p>
            ))}
            <br />
            {/* Modules for the cohort they're in go here */}
            <h3>Grades</h3>
            {/* Maps over studentGrades array displays info on their grades */}
            {studentGrades.map((grade) => (
              <p key={grade.id}>Module: {grade.module.split('/')[5]} -
              CA Mark: {grade.ca_mark.toFixed(2)} -
              Exam Mark: {grade.exam_mark.toFixed(2)}</p>
            ))}
          </div>
        )}
        <br />
        <form onSubmit={handleSubmit}>
          <br />
          <label>
            {/* Enter student ID first to search for a student */}
            Student ID:
            <input type="text" value={studentId} maxLength={8} onChange={handleStudentIdChange} />
          </label>
          <button type="submit">Search</button>
        </form>
        <br />
        {/* For creating a new Student */}
        <StudentButton />
        <br />
        <br />
        {/* Directs user to a new page to set grades for a student */}
        <button onClick={() => navigate("/student/set-grade")}>Set Student Grade</button>
        <br />
        <br />
        <br />
        {/* Only need the home page button here no back button needed as this on student page */}
        <button onClick={() => navigate("/")}>Return to Home</button>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

export default Student;
