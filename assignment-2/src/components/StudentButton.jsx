import { Link } from "react-router-dom";

// Button component that sends the user to a new page to create a new student
function StudentButton() {
  return (
    <Link to="/new-student">
      <br />
      <button>Create New Student</button>
      <br />
    </Link>
  );
}

export default StudentButton;
