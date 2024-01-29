import { useEffect, useState } from "react";
import {useLocation, useNavigate } from "react-router-dom";

function Module(){
    const location = useLocation();
    const module = location.state.module;
    const [setModuleCode] = useState([]);
    const navigate = useNavigate();

    // Gets info on a module and adds it to an array called moduleCode
    useEffect(()=>{
        if(module.length===0){
            // if module hasn't already been loaded and set
            fetch(`http://127.0.0.1:8000/api/module/?code=${module.code}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setModuleCode(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    });

    return (
        <div>
            {/* Displays module info */}
            <h1>Module: {module.code}</h1>
            <h3>Module Info</h3>
            <p>Module Code: {module.code}</p>
            <p>Module Name: {module.full_name}</p>
            <p>Ca Split: {module.ca_split}</p>
            <br />
            {/* User can go back to view all modules */}
            <button
                style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }} onClick={() => navigate("/module")}>View Modules</button>
            <br />
            <br />
            {/* Button to return home */}
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

export default Module;
