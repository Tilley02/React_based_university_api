import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function ModulesToCohort() {
  const [cohorts, setCohorts] = useState([]);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  // Gets cohort info
  useEffect(() => {
    if (cohorts.length === 0) {
      fetch("http://127.0.0.1:8000/api/cohort/")
        .then(resp => resp.json())
        .then(data => {
          setCohorts(data);
        })
    };

    // Gets module info
    if (modules.length === 0) {
      fetch("http://127.0.0.1:8000/api/module/")
        .then(resp => resp.json())
        .then(data => {
          setModules(data);
        })
    };
  }, [cohorts, modules]);

  const displayCohorts = () =>{
    return cohorts.map((cohort)=>
        <li key={cohort.name}>
          {/* Lists the cohorts of every degree */}
          {cohort.id} - {cohort.name}
          <ul>
            {/* Here loops over all cohorts and adds them to an array then loops over modules that only appear in that cohort */}
           {modules.filter((module) => module.delivered_to.includes(`http://127.0.0.1:8000/api/cohort/${cohort.id}/`))
              .map((module) => (
                <li key={module.code}>
                  {module.code} - {module.full_name}
                </li>
               ))}
          </ul>
        </li>
    )}

   return (
    <div>
      <h1>List of all Cohorts and their Degrees</h1>
      <ul>
         {displayCohorts()}
      </ul>
      <br />
      <br />
      <br />
      <button
        onClick={() => navigate("/new-module")}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>Create New Module</button>
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
      <br />
      <br />
      <br />
    </div>
   )
}

export default ModulesToCohort;
