import { Link } from "react-router-dom";

// Button component that redirects the user to a new page to create a new module
function ModuleButton() {
  return (
    <Link to="/new-module" style={{ textDecoration: 'none' }}>
       <div style={{ display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center' }}>
         <button style={{ backgroundColor: '#4CAF50',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          border: 'none',
                          cursor: 'pointer' }}>Create New Module</button>
       </div>
     </Link>
  );
}

export default ModuleButton;
