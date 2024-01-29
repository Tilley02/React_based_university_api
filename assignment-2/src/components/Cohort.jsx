import { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";

function Cohort(){
    const location = useLocation();
    const cohort = location.state.cohort;
    const [students, setStudents] = useState([]); // cohorsts wish default value
    const navigate = useNavigate();

    // Gets all students in a cohort, adds them to an array called students, to be used to display students in a cohort
    useEffect(()=>{
        if(students.length===0){
            // if students hasn't already been loaded and set
            fetch(`http://127.0.0.1:8000/api/student/?cohort=${cohort.id}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setStudents(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })

    // Maps over students array displaying info chosen below
    const displayStudents = () =>{
        return students.map((s)=>
            <li key={s.student_id}> {s.first_name} {s.last_name}</li>
        )
    }

    return (
        <div>
            <h1>Cohort: {cohort.id} - {cohort.name}</h1>
            <h3>Students in Cohort</h3>
            <ul>
                {/* An unordered list of coherts in the degree */}
                {displayStudents()}
            </ul>
            <br />
            {/* Back button so user can view all cohorts */}
            <button
                style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }} onClick={() => navigate("/cohort")}>View Cohorts</button>
            <br />
            <br />
            {/* Button to return to home page */}
            <button
                style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }} onClick={() => navigate("/")}>Return to Home</button>
        </div>
    )
}

export default Cohort;
