import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./userProfile.css";

function App() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  // Function to toggle alert visibility
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  const fetchEmployee = async () => {
    try {
      const response = await fetch(
        `https://employeemanagementsystemnode.onrender.com/employeeProfile/${id}`
      );
      const jsonResponse = await response.json();
      setUser(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEmployee = async () => {
    try {
      const response = await fetch(
        `https://employeemanagementsystemnode.onrender.com/employee/${id}`
      ,{
        method:"DELETE"
      });
      const res=await res.json();
      return res;
    } catch (error) {
      console.log(error);
      return error
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, []);
  const navigate=useNavigate();
  const [activeBtn, setActivebtn] = useState(true);
  const handleEdit=()=>{
    navigate(`/createuser/${id}`)
  }
  const handleDelete=async()=>{
    deleteEmployee();
    navigate("/")
  }
  const ActivateEmployee=async(active)=>{
    try{
      const response=await fetch(`https://employeemanagementsystemnode.onrender.com/employee/${active}/${id}`)
      const res=await response.json();
      return res;
    }
    catch(error){
      console.log(error);
      return error;
    }
  }
  const handleActiveEmployee=() => {
    ActivateEmployee(!activeBtn)
    setActivebtn((prev) => !prev)
  }
  if (user.name == undefined) {
    return "Loading";
  }
  return (
    <div className="app">
      {showAlert && (
        <div className="alert-container">
          <div className="alert">
            <span className="alert-message">Are You Sure!</span>
            <button className="close-btn confirm" onClick={handleDelete}>Confirm</button>
            <button className="close-btn" onClick={toggleAlert}>X</button>
          </div>
        </div>
      )}
      <div className="profileBtn">
        <div
          className={`activeBtnContainer ${activeBtn ? "" : "inactive"}`}
          onClick={handleActiveEmployee}
        >
          <div className={`activeColor ${activeBtn ? "" : "inactive"}`}></div>
          {activeBtn ? "Active" : "InActive"}
        </div>
        <div onClick={handleEdit} className={`activeBtnContainer editBtn`} >
          Edit
        </div>
        <div onClick={()=>toggleAlert()} className={`activeBtnContainer deleteBtn`} >
          Delete
        </div>
      </div>

      <div className="profile">
        <img src={user.images} alt="Profile" className="profile-img" />
        <h1>{user.name}</h1>
        <h3>{user.role}</h3>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dob}
        </p>
        <p>
          <strong>Marital Status:</strong> {user.maritalStatus}
        </p>
        <p>
          <strong>Location:</strong> {user.address}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Country:</strong> {user.country}
        </p>
        <p>
          <strong>Timezone:</strong> {user.timezone}
        </p>
      </div>
      <div className="details">
        <div className="section">
          <h2>Skills</h2>
          <ul>
            {user.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* <div className="section">
          <h2>Certifications</h2>
          <ul>
            {user.certification &&
              user.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
          </ul>
        </div> */}

        <div className="section">
          <h2>Projects</h2>
          {user.projects.map((project, index) => (
            <div key={index} className="project">
              <h3>{project.projectName}</h3>
              <p>
                <strong>Role:</strong> {project.role}
              </p>
              <p>
                <strong>Details:</strong> {project.projectDetails}
              </p>
              <p>
                <strong>Used in:</strong> {project.projectUsed}
              </p>
              <p>
                <strong>Year:</strong> {project.projectYear}
              </p>
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Project URL
              </a>
            </div>
          ))}
        </div>

        <div className="section">
          <h2>Education</h2>
          <p>
            <strong>Degree:</strong> {user.education[0].degree}
          </p>
          <p>
            <strong>Field:</strong> {user.education[0].field}
          </p>
          <p>
            <strong>Institution:</strong> {user.education[0].institution}
          </p>
          <p>
            <strong>Year of Graduation:</strong> {user.education[0].year}
          </p>
        </div>

        <div className="section">
          <h2>Achievements</h2>
          <p>{user.achievements}</p>
        </div>

        <div className="section">
          <h2>Interests</h2>
          <ul>
            {user.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Languages</h2>
          <ul>
            {user.languages.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="social-links">
        <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={user.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  );
}

export default App;
