import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ModuleButton from './ModuleButton';

function ModulesList() {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  // Gets info on modules and adds them to an array called modules
  useEffect(() => {
    if (modules.length === 0) {
      fetch("http://127.0.0.1:8000/api/module/")
        .then(resp => resp.json())
        .then(data => {
          setModules(data);
        })
    }
  });

  // Maps over the modules array and displays the info below
  const displayModules = () =>{
   return modules.map((module)=>
       <li key={module.code} style={styles.listItem}>
         {/* Lists the degrees and a link to view single degree and its cohorts */}
           Code: {module.code} - Module: {module.full_name} <Link to={`/module/${module.code}`} state={{module:module}} style={styles.link}>View Module</Link>
       </li>
   )
  }

   return (
    <div style={styles.container}>
      <h1 style={styles.title}>List of Modules:</h1>
      <ul style={styles.list}>
         {displayModules()}
      </ul>
      <br />
      {/* Component that is a button that redirects the users to a page to create a new module */}
      <ModuleButton />
      <br />
      <br />
      <button onClick={() => navigate("/module/module-to-cohort")} style={styles.button}>View Modules in a Cohort</button>
      <br />
      {/* Button to return to home page */}
      <button onClick={() => navigate("/")} style={styles.button}>Return to Home</button>
      <br />
      <br />
      <br />
    </div>
   )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '30px'
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0
  },
  listItem: {
    fontSize: '18px',
    margin: '20px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    fontSize: '18px',
    color: '#4CAF50',
    textDecoration: 'none',
    marginLeft: '20px'
  },
  button: {
    fontSize: '16px',
    margin: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '5px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer'
  }
};

export default ModulesList;
