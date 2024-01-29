import { Link } from "react-router-dom";

// Component that is a button and when clicked sends the user to a new page to create a new degree
function DegreeButton() {
   return (
     <Link to="/new-degree" style={{ textDecoration: 'none' }}>
       <div style={{ display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center' }}>
         <button style={{ backgroundColor: '#4CAF50',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          border: 'none',
                          cursor: 'pointer' }}>Create New Degree</button>
       </div>
     </Link>
   );
}

export default DegreeButton;
