import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentGrade() {
   const [module, setModule] = useState("");
   const [moduleList, setModuleList] = useState([]);
   const [caMark, setCaMark] = useState("");
   const [examMark, setExamMark] = useState("");
   const [cohort, setCohort] = useState("");
   const [cohortList, setCohortList] = useState([]);
   const [student, setStudent] = useState("");
   const navigate = useNavigate();

   // Makes an array of modules to be picked from in form
   useEffect(() => {
      fetch("http://127.0.0.1:8000/api/module/")
        .then((response) => response.json())
        .then((data) => setModuleList(data))
        .catch((error) => console.log(error));
    }, []);

    // Makes a list of cohorts to be picked from in form
   useEffect(() => {
      fetch("http://127.0.0.1:8000/api/cohort/")
        .then((response) => response.json())
        .then((data) => setCohortList(data))
        .catch((error) => console.log(error));
    }, []);

   // For updating the page when new input is entered and submitted
   const handleModuleChange = (e) => {
      setModule(e.target.value);
   };
   const handleCaMarkChange = (e) => {
      setCaMark(e.target.value);
   };
   const handleExamMarkChange = (e) => {
      setExamMark(e.target.value);
   };
   const handleCohortChange = (e) => {
      setCohort(e.target.value);
   };
   const handleStudentChange = (e) => {
      setStudent(e.target.value);
   };


   // For when the form is submitted
   const handleSubmit = (e) => {
      e.preventDefault();

      // Makes sure no boxes are left blank
      if (!module || !caMark || !examMark || !cohort || !student) {
         alert("Please fill in all fields.");
         return;
      }

         // Print information to console
      console.log({
         module: `http://127.0.0.1:8000/api/module/${module}/`,
         ca_mark: caMark,
         exam_mark: examMark,
         cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
         total_grade: parseInt(caMark)+ parseInt(examMark), // See how to print out as a float number
         student: `http://127.0.0.1:8000/api/student/${student}/`
      });


      // For sending info to student api
      fetch('http://127.0.0.1:8000/api/grade/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
         module: `http://127.0.0.1:8000/api/module/${module}/`,
         ca_mark: caMark,
         exam_mark: examMark,
         cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
         total_grade: parseInt(caMark) + parseInt(examMark),
         student: `http://127.0.0.1:8000/api/student/${student}/`
        })
      })
      .then(response => response.json())
      .then(data => {

        // Reset form fields
        setModule("");
        setCaMark("");
        setExamMark("");

        // Returns to degrees page after submitting form
        navigate("/student");
      })
    }

   // Need a form to use so user can enter new degree
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <br />
            <br />
            <label>
               {/* Maps over moduleList to select the module setting the grade for */}
               Module:
                  <select value={module} onChange={handleModuleChange}>
                     <option value="">Select a Module</option>
                     {moduleList.map((module) => (
                        <option key={module.code} value={module.code}>
                        {module.code}
                     </option>
                     ))}
               </select>
            </label>
            <br />
            <br />
            <label>
               Ca Mark: <input type="number" step="any" value={caMark} onChange={handleCaMarkChange}/>
            </label>
            <br />
            <br />
            <label>
               Exam Mark: <input type="number" step="any" value={examMark} onChange={handleExamMarkChange}/>
            </label>
            <br />
            <br />
            <label>
               {/* Maps over cohortlist to chose students cohort */}
               Cohort:
               <select value={cohort} onChange={handleCohortChange}>
                  <option value="">Select a Cohort</option>
                  {cohortList.map((cohort) => (
                     <option key={cohort.id} value={cohort.id}>
                     {cohort.id}
                  </option>
                  ))}
               </select>
            </label>
            <br />
            <br />
            <label>
               Student ID: <input type="number" value={student} onChange={handleStudentChange}/>
            </label>
            <br />
            <br />
            <button type="submit">Submit Grade</button>
         </form>
         <br />
         <br />
         {/* Back button if user wants to go back to search for a student */}
         <button onClick={() => navigate("/student")}>Back</button>
         <br />
         <br />
         <br />
         {/* Button to return home */}
         <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
   );
}

export default StudentGrade;
