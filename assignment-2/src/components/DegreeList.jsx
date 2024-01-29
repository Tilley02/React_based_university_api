import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import DegreeButton from './DegreeButton';

function DegreeList() {
  const [degrees, setDegrees] = useState([]);
  const navigate = useNavigate();

  // Gets info on degrees
  useEffect(() => {
    if (degrees.length === 0) {
      fetch("http://127.0.0.1:8000/api/degree/")
        .then(resp => resp.json())
        .then(data => {
          setDegrees(data);
        })
    }
  });

  // Maps over degrees and prints out info wanted on the degrees to a list
  const displayDegrees = () =>{
   return degrees.map((degree)=>
       <li key={degree.shortcode} style={styles.listItem}>
         {/* Lists the degrees and a link to view single degree and its cohorts */}
           {degree.full_name} - {degree.shortcode} <Link to={`/degree/${degree.shortcode}`} state={{degree:degree}} style={styles.link}>View Degree</Link>
       </li>
   )
}

   return (
    <div style={styles.container}>
      <h1 style={styles.title}>List of Degrees:</h1>
      <ul style={styles.list}>
         {displayDegrees()}
      </ul>
      <br />
      {/* Button that brings user to new page to create a degree */}
      <DegreeButton />
      <br />
      {/* Button to return to home page */}
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
};

export default DegreeList;
