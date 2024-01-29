import { Link } from "react-router-dom";

// Button component so user can go to create a new cohort page
function CohortButton() {
  return (
    <Link to="/new-cohort" style={{ textDecoration: 'none' }}>
       <div style={{ display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center' }}>
         <button style={{ backgroundColor: '#4CAF50',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          border: 'none',
                          cursor: 'pointer' }}>Create New Cohort</button>
       </div>
     </Link>
  );
}

export default CohortButton;
