import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import CohortButton from './CohortButton';

function CohortList() {
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  // Gets cohort info to be used and saves to an array called cohorts
  useEffect(() => {
    if (cohorts.length === 0) {
      fetch("http://127.0.0.1:8000/api/cohort/")
        .then(resp => resp.json())
        .then(data => {
          setCohorts(data);
        })
    };
  });

  // Maps over cohort array displaying info chosen below, here is the cohorts id and name
  const displayCohorts = () =>{
   return cohorts.map((cohort)=>
       <li key={cohort.name} style={styles.listItem}>
         {/* Lists the cohorts of every degree, can click link to view single cohort and info */}
           {cohort.id} - {cohort.name} <Link to={`/cohort/${cohort.id}`} state={{cohort:cohort}} style={styles.link}>View Cohort</Link>
       </li>
   )
  }

   return (
    <div style={styles.container}>
      <h1 style={styles.title}>List of all Cohorts:</h1>
      <ul style={styles.list}>
         {displayCohorts()}
      </ul>
      <br />
      {/* To create a new Cohort */}
      <CohortButton />
      <br />
      <button onClick={() => navigate("/")} style={styles.button}>Return to Home</button>
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
}

export default CohortList;
