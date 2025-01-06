import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./loader/Loader";
import "./userProfile.css";
import DefaultImg from "../assests/ajay.jpg";
import LinkedinIcon from "../assests/linkedinIcon.svg";
import GithubIcon from "../assests/githubIcon.svg";

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
        `https://employeemanagementsystemnode.onrender.com/employee/${id}`,
        {
          method: "DELETE",
        }
      );
      const res = await res.json();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  useEffect(() => {
    fetchEmployee();
  }, []);
  const navigate = useNavigate();
  const [activeBtn, setActivebtn] = useState(false);
  const handleEdit = () => {
    navigate(`/createuser/${id}`);
  };
  const handleDelete = async () => {
    deleteEmployee();
    navigate("/");
  };
  const ActivateEmployee = async (active) => {
    try {
      const response = await fetch(
        `https://employeemanagementsystemnode.onrender.com/employee/${active}/${id}`
      );
      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const handleActiveEmployee = () => {
    ActivateEmployee(!activeBtn);
    setActivebtn((prev) => !prev);
  };
  if (user.name == undefined) {
    return (
      <div className="loaderContainer">
        <Loader />
      </div>
    );
  }
  return (
    <div className="userProfileContainer">
      {showAlert && (
        <div className="alert-container">
          <div className="alert">
            <span className="alert-message">Are You Sure!</span>
            <button className="close-btn confirm" onClick={handleDelete}>
              Confirm
            </button>
            <button className="close-btn" onClick={toggleAlert}>
              X
            </button>
          </div>
        </div>
      )}
      <div className="profileSection-1">
        <div className="profileCard">
          <div className="imageBackground"></div>
          <img className="userImage" src={DefaultImg} alt="UserImage" />
          <div className="personalDetails">
            <h3 className="profilecardName">{user.name}</h3>
            <div className="profilecardDetails">
              {user.gender} <span>{user.dob}</span>
            </div>
            <div className="profilecardDetails">{user.maritalStatus}</div>
            <div className="profilecardDetails">{user.address}</div>
          </div>
        </div>
        <div className="contactCard">
          <h3 className="contactHeading">Contact Details</h3>
          <hr />
          <p className="contactCardDetails">
            <strong>Email:</strong>
            <span className="profilecardDetails">{user.email}</span>
          </p>
          <p className="contactCardDetails">
            <strong>Phone:</strong>{" "}
            <span className="profilecardDetails">{user.phone}</span>
          </p>
          <p className="contactCardDetails">
            <strong>Address:</strong>{" "}
            <span className="profilecardDetails">{user.address}</span>
          </p>
          <p className="contactCardDetails">
            <strong>Country:</strong>{" "}
            <span className="profilecardDetails">{user.country}</span>
          </p>
        </div>
        <div className="educationCard">
          <h3 className="contactHeading">Education Details</h3>
          <hr />
          <p className="contactCardDetails">
            <strong>Degree:</strong>
            <span className="profilecardDetails">
              {user.education[0].degree}
            </span>
          </p>
          <p className="contactCardDetails">
            <strong>Field:</strong>
            <span className="profilecardDetails">
              {user.education[0].field}
            </span>
          </p>
          <p className="contactCardDetails">
            <strong>Institution:</strong>
            <span className="profilecardDetails">
              {user.education[0].institution}
            </span>
          </p>
          <p className="contactCardDetails">
            <strong>Year of Graduation:</strong>
            <span className="profilecardDetails">{user.education[0].year}</span>
          </p>
        </div>
      </div>
      <div className="profileSection-1">
        <div className="projectsCard">
          <h3 className="contactHeading">Projects</h3>

          <hr />
          {user.projects.map((project, index) => (
            <div key={index} className="project">
              <div className="projectHeadingContainer">
                <h4 className="projectName">{project.projectName}</h4>
                <span>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                  </a>
                </span>
              </div>
              <p className="contactCardDetails">
                <strong>Role:</strong>{" "}
                <span className="profilecardDetails">{project.role}</span>
              </p>
              <p className="contactCardDetails">
                <strong>Details:</strong>
                <span className="profilecardDetails">
                  {project.projectDetails}{" "}
                </span>
              </p>
              <p className="contactCardDetails">
                <strong>Used in:</strong>
                <span className="profilecardDetails">
                  {project.projectUsed}
                </span>
              </p>
              <p className="contactCardDetails">
                <strong>Year:</strong>
                <span className="profilecardDetails">
                  {project.projectYear}{" "}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="professionCard">
          <h3 className="contactHeading">Professional Details</h3>
          <hr />
          <h4 className="projectName userRole">{user.role}</h4>
          <p className="contactCardDetails">
            <strong>Specialization:</strong>
            <span className="profilecardDetails">{user.expertise}</span>
          </p>
          <p className="contactCardDetails">
            <strong>Skills:</strong>
            <span className="profilecardDetails">
              <ul>
                {user.skills.map((skill, index) => (
                  <li key={index}>{skill.toUpperCase()}</li>
                ))}
              </ul>
            </span>
          </p>
          <p className="contactCardDetails">
            <strong>Languages:</strong>
            <span className="profilecardDetails">
              <ul>
                {user.languages.map((language, index) => (
                  <li key={index}>{language.toUpperCase()}</li>
                ))}
              </ul>
            </span>
          </p>
        </div>
      </div>
      <div className="profileSection-1">
        <div className="extraDetailsCard">
          <h3 className="contactHeading">Other Details</h3>
          <hr />

          <p className="contactCardDetails">
            <strong>Interests:</strong>
            <span className="profilecardDetails">
              <ul>
                {user.interests.map((interest, index) => (
                  <li key={index}>{interest.toUpperCase()}</li>
                ))}
              </ul>
            </span>
          </p>
          <p className="contactCardDetails">
            <strong>Achievements:</strong>
            <span className="profilecardDetails">{user.achievements}</span>
          </p>
          <p></p>
          <p className="socialDetails">
            <a href={user.linkedin}>
              <img className="footerLink" src={LinkedinIcon} />
            </a>
            <a href={user.github}>
              <img className="footerLink footergit" src={GithubIcon} />
            </a>
          </p>
        </div>
      </div>
      <div className="buttonSection">
        <div></div>
        <div className="buttonContainer">
          {console.log("status", user.active)}
          <div
            className={`activeBtnContainer ${
              activeBtn || user.active ? "" : "inactiveBtn"
            }`}
            onClick={handleActiveEmployee}
          >
            {activeBtn || user.active ? "Active" : "InActive"}
          </div>
          <div onClick={handleEdit} className={`activeBtnContainer editBtn`}>
            Edit
          </div>
          <div
            onClick={() => toggleAlert()}
            className={`activeBtnContainer deleteBtn`}
          >
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
