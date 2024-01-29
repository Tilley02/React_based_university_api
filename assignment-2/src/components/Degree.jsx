import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Degree() {
  const location = useLocation();
  const degree = location.state.degree;
  const [cohorts, setCohorts] = useState([]); // cohorts wish default value
  const navigate = useNavigate();

  // Loops over all cohorts and adds their info to a list called cohorts
  useEffect(() => {
    if (cohorts.length === 0) {
      // if cohorts hasn't already been loaded and set
      fetch(`http://127.0.0.1:8000/api/cohort/?degree=${degree.shortcode}`)
        .then((resp) => resp.json())
        .then((data) => {
          setCohorts(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  // Loops over the cohorts array printing out info wanted
  const displayCohorts = () => {
    return cohorts.map((c) => <li key={c.id}> {c.name} </li>);
  };

  return (
    <div>
      <h1>Degree: {degree.full_name} - {degree.shortcode}</h1>
      <h3>Cohorts in Degree</h3>
      <ul>
        {/* An unordered list of coherts in the degree */}
        {displayCohorts()}
      </ul>
      <br />
      {/* Sends user back to view list of all degrees */}
      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/degree")}>View Degrees</button>
      <br />
      <br />
      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
}

export default Degree;
