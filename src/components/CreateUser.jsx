import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./createUser.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [EmployeeDetails, setEmployeeDetails] = useState({
    active: true,
    role: "",
    name: "",
    gender: "",
    dob: "",
    maritalStatus: "Single",
    address: "",
    expertise: "",
    experience: 0,
    images: "",
    email: "",
    phone: 0,
    linkedin: "",
    github: "",
    country: "India",
    projects: [
      {
        projectName: "",
        projectDetails: "",
        projectUsed: "",
        projectYear: "",
        projectUrl: "",
        role: "",
      },
    ],
    skills: [],
    availability: "Full Time",
    achievements: "",
    languages: [],
    education: [
      {
        degree: "B.tech",
        field: "Computer Science And Engineering",
        institution: "",
        year: 0,
      },
    ],
    interests: [],
  });
  const [inputError, setinputError] = useState({
    active: true,
    role: "",
    name: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    address: "",
    expertise: "",
    experience: 0,
    images: "",
    email: "",
    phone: 0,
    linkedin: "",
    github: "",
    country: "",
    projects: [
      {
        projectName: "",
        projectDetails: "",
        projectUsed: "",
        projectYear: "",
        projectUrl: "",
        role: "",
      },
    ],
    skills: [],
    availability: "",
    achievements: "",
    languages: [],
    education: [
      {
        degree: "",
        field: "",
        institution: "",
        year: 0,
      },
    ],
    interests: [],
  });
  const [validate, setValidate] = useState(true);
  const ValidateName = (input) => {
    const regex = /^[A-Za-z\s]+$/;
    if (input.length === 0) {
      return "Name is required";
    } else if (!regex.test(input)) {
      // Check if input contains only alphabet letters (A-Z, a-z)
      return "Please use alphabets only";
    } else if (input.length < 2) {
      // Check if the input length is less than 2
      return "Must be greater than 2";
    } else {
      return ""; // If all validations pass
    }
  };
  const ValidateEmail = (input) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (input.length === 0) {
      return "Please provide an email address";
    } else if (!regex.test(input)) {
      return "Please provide valid email address";
    } else {
      return "";
    }
  };
  const ValidatePhone = (input) => {
    const regex =
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (input.length === 0) {
      return "Please provide Phone Number";
    } else if (!regex.test(input)) {
      return "Please provide valid phone number";
    } else {
      return "";
    }
  };
  const ValidateUrl = (input, name) => {
    const regex =
      /^(https?|ftp):\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?(\?[^\s]*)?(#[^\s]*)?$/;
    if (input.length === 0) {
      return `Please provide ${name} url`;
    } else if (!regex.test(input)) {
      return `Please provide valid ${name} url`;
    } else {
      return "";
    }
  };
  const ValidateExperience = (input) => {
    if (input.length === 0) {
      return "Please provide Experience";
    } else if (input === 0) {
      return "Please provide experience greater than 0";
    } else if (isNaN(input)) {
      return "Please provide experience in years";
    } else {
      return "";
    }
  };
  const ValidateArray = (input,name) => {
    if (input.length === 0) {
      return `please provide a ${name}`;
    } else if (input.length < (name=="skill"?3:2)) {
      return `Please enter atleast ${name=="skill"?'3':'2'} ${name}s`;
    } else {
      return "";
    }
  };
  const Validator = () => {
    setinputError((prev) => ({
      ...prev,
      name: ValidateName(EmployeeDetails.name),
    }));
    setinputError((prev) => ({
      ...prev,
      gender: EmployeeDetails.gender.length > 0 ? "" : "Gender is Required", // Update gender in the state
    }));
    setinputError((prev) => ({
      ...prev,
      dob: EmployeeDetails.dob.length > 0 ? "" : "Date of birth is Required",
    }));
    setinputError((prev) => ({
      ...prev,
      email: ValidateEmail(EmployeeDetails.email),
    }));
    setinputError((prev) => ({
      ...prev,
      phone: ValidatePhone(EmployeeDetails.phone),
    }));
    setinputError((prev) => ({
      ...prev,
      linkedin: ValidateUrl(EmployeeDetails.linkedin, "linkedin"),
    }));
    setinputError((prev) => ({
      ...prev,
      github: ValidateUrl(EmployeeDetails.github, "github"),
    }));
    setinputError((prev) => ({
      ...prev,
      role: EmployeeDetails.role.length > 2 ? "" : "Role is Required",
    }));
    setinputError((prev) => ({
      ...prev,
      expertise:
        EmployeeDetails.expertise.length > 3 ? "" : "Expertise is Required",
    }));
    setinputError((prev) => ({
      ...prev,
      experience: ValidateExperience(EmployeeDetails.experience),
    }));
    setinputError((prev) => ({
      ...prev,
      skills: ValidateArray(EmployeeDetails.skills,"skill"),
    }));
    setinputError((prev) => {
      const education = [...prev.education];
      education[0] = {
        ...education[0],
        institution:
          EmployeeDetails.education[0].institution.length > 0
            ? ""
            : "Please Provide Instiute name",
      };
      return { ...prev, education: education };
    });
    setinputError((prev) => {
      const education = [...prev.education];
      education[0] = {
        ...education[0],
        year:
          EmployeeDetails.education[0].year.length > 0
            ? ""
            : "Please Provide date of graduation",
      };
      return { ...prev, education: education };
    });
    setinputError((prev) => {
      const projects = [...prev.projects]; // Create a shallow copy of the projects array
      projects[0] = {
        ...projects[0],
        projectName:
          EmployeeDetails.projects[0].projectName.length > 0
            ? ""
            : "Please Provide Project Name",
      }; // Update projectName
      return { ...prev, projects }; // Return the updated state
    });
    setinputError((prev) => {
      const projects = [...prev.projects]; // Create a shallow copy of the projects array
      projects[0] = {
        ...projects[0],
        projectDetails: EmployeeDetails.projects[0].projectDetails.length > 0
        ? ""
        : "Please Provide Project Details",
      }; // Update projectName
      return { ...prev, projects }; // Return the updated state
    });
    setinputError((prev) => {
      const projects = [...prev.projects]; // Create a shallow copy of the projects array
      projects[0] = {
        ...projects[0],
        projectYear: EmployeeDetails.projects[0].projectYear.length>0?"":"Please Last Used Date",
      }; // Update projectName
      return { ...prev, projects }; // Return the updated state
    });
    setinputError((prev) => {
      const projects = [...prev.projects]; // Create a shallow copy of the projects array
      projects[0] = {
        ...projects[0],
        projectUsed: EmployeeDetails.projects[0].projectUsed.length>0?"":"Please provide details where you used project!",
      }; // Update projectName
      return { ...prev, projects }; // Return the updated state
    });
    setinputError((prev) => {
      const projects = [...prev.projects]; // Create a shallow copy of the projects array
      projects[0] = {
        ...projects[0],
        projectUrl: ValidateUrl(EmployeeDetails.projects[0].projectUrl,EmployeeDetails.projects[0].projectName.length>0?EmployeeDetails.projects[0].projectName:"project"),
      }; // Update projectName
      return { ...prev, projects }; // Return the updated state
    });
    setinputError((prev) => {
      const projects = [...prev.projects]; // Create a shallow copy of the projects array
      projects[0] = { ...projects[0], role:  EmployeeDetails.projects[0].role.length>0?"":"Please provide your role in project!"}; // Update projectName
      return { ...prev, projects }; // Return the updated state
    });
    setinputError((prev) => ({
      ...prev,
      languages: ValidateArray(EmployeeDetails.languages,"language"),
    }));
    setinputError((prev) => ({
      ...prev,
      interests: ValidateArray(EmployeeDetails.interests,"interest"),
    }));
    setinputError((prev) => ({
      ...prev,
      achievements: EmployeeDetails.achievements.length>0?"":"Please provide any achievement",
    }));
    setinputError((prev) => ({
      ...prev,
      address: EmployeeDetails.address.length>0?"":"Please provide your permanent address",
    }))
  };
  const fieldArray = [
    "Computer Science And Engineering",
    "Information And Technology",
    "Data Science",
    "Artificial Intelligence",
    "Cyber Security",
    "Cloud Computing",
    "BlockChains",
    "Robotics",
  ];
  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    setEmployeeDetails((prev) => {
      const languages = checked
        ? [...prev.languages, value] // Add language if checked
        : prev.languages.filter((lang) => lang !== value); // Remove language if unchecked
      return { ...prev, languages }; // Update the state
    });
  };

  const handleGenderChange = (e) => {
    const { value } = e.target; // Get the selected gender value
    setEmployeeDetails((prev) => ({
      ...prev,
      gender: value, // Update gender in the state
    }));
  };
  const [Interest, setInterest] = useState("");
  const [Skill, setSkill] = useState("");
  // Handle image change (when a user selects a new image)
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      // If you want to store the file object:
      setEmployeeDetails((prev) => ({
        ...prev,
        images: file, // Store the file object itself
      }));

      // Or, if you want to display the image immediately:
      const imageUrl = URL.createObjectURL(file); // Create an image URL
      setEmployeeDetails((prev) => ({
        ...prev,
        images: imageUrl, // Store the image URL for immediate display
      }));
    }
  };
  const AddSkills = () => {
    if (Skill && !EmployeeDetails.skills.includes(Skill)) {
      setEmployeeDetails((prev) => ({
        ...prev,
        skills: [...prev.skills, Skill],
      }));
      setSkill(""); // Clear the input field after adding
    }
  };
  const removeSkill = (skill, e) => {
    e.preventDefault();
    setEmployeeDetails((prev) => ({
      ...prev,
      skills: prev.skills.filter((includedskill) => skill !== includedskill),
    }));
  };
  const AddInterest = () => {
    if (Interest && !EmployeeDetails.interests.includes(Interest)) {
      setEmployeeDetails((prev) => ({
        ...prev,
        interests: [...prev.interests, Interest],
      }));
      setSkill(""); // Clear the input field after adding
    }
  };
  const RemoveInterest = (interest, e) => {
    e.preventDefault();
    setEmployeeDetails((prev) => ({
      ...prev,
      interests: prev.interests.filter(
        (includedinterest) => interest !== includedinterest
      ),
    }));
  };
  const createEmployee = async () => {
    try {
      const response = await fetch("https://employeemanagementsystemnode.onrender.com/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EmployeeDetails }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployee = async () => {
    try {
      const response = await fetch(`https://employeemanagementsystemnode.onrender.com/employee/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EmployeeDetails }),
      });
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchEmployee = async (id) => {
    try {
      const response = await fetch(
        `https://employeemanagementsystemnode.onrender.com/employeeProfile/${id}`
      );
      const jsonResponse = await response.json();
      setEmployeeDetails(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
    console.log("simple", id);
  }, [id]);
  const CreateUser = (e) => {
    Validator();
    e.preventDefault();
    console.log(EmployeeDetails);
    // createEmployee();
  };

  const UpdateUser = (e) => {
    e.preventDefault();
    console.log(EmployeeDetails);
    // updateEmployee();
  };
  return (
    <div className="createUserContainer">
      <form className="createUserForm">
        <p className="heading">Personal Details</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="name">Full Name</label>
              <div className="errorUI">
                <input
                  name="name"
                  id="fullName"
                  value={EmployeeDetails.name}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
                {inputError.name.length > 0 && (
                  <div className="formInput error">{inputError.name}</div>
                )}
              </div>
            </div>
            <div>
              <div className="genderSec">
                <label htmlFor="gender">Gender</label>
                <div className="formInput" style={{ gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    checked={EmployeeDetails.gender === "Male"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="formInput" style={{ gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    checked={EmployeeDetails.gender === "Female"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div className="formInput" style={{ gap: "0.5rem" }}>
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="Other"
                    checked={EmployeeDetails.gender === "Other"}
                    onChange={handleGenderChange}
                  />
                  <label htmlFor="other">Other</label>
                </div>
                {inputError.gender.length > 0 ? (
                  <div className="formInput error" style={{ gap: "0.5rem" }}>
                    {inputError.gender}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="DOB">DOB</label>
              <div className="errorUI">
                <input
                  type="date"
                  name="DOB"
                  id="DOB"
                  value={EmployeeDetails.dob}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                />
                {inputError.dob > 0 ? (
                  <></>
                ) : (
                  <div className="error">{inputError.dob}</div>
                )}
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="MaritalStatus">MaritalStatus</label>
              <select
                name="MaritalStatus"
                value={EmployeeDetails.maritalStatus}
                onChange={(e) =>
                  setEmployeeDetails((prev) => ({
                    ...prev,
                    maritalStatus: e.target.value,
                  }))
                }
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </div>
            <div className="formInput">
              <label htmlFor="Address">Address</label>
              <div className="errorUI">
              <input
                type="text"
                name="Address"
                id="Address"
                value={EmployeeDetails.address}
                onChange={(e) =>
                  setEmployeeDetails((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
                {inputError.address.length>0?<div className="error">{inputError.address}</div>:<></>}
              </div>
              
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                value={EmployeeDetails.country}
                onChange={(e) =>
                  setEmployeeDetails((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              >
                <option value="India">India</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="formInput">
              <label htmlFor="img">Upload Your Picture</label>
              <input
                name="img"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <hr />
        <p className="heading">Contact Details</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="email">Email</label>
              <div className="errorUI">
                <input
                  name="email"
                  id="email"
                  value={EmployeeDetails.email}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                {inputError.email.length > 0 ? (
                  <div className="error">{inputError.email}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="phone">Phone No.</label>
              <div className="errorUI">
                <input
                  name="phone"
                  id="phone"
                  value={EmployeeDetails.phone}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
                {inputError.phone.length > 0 ? (
                  <div className="error">{inputError.phone}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="linkdin">Linkdin</label>
              <div className="errorUI">
                <input
                  name="linkdin"
                  id="linkdin"
                  value={EmployeeDetails.linkedin}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      linkedin: e.target.value,
                    }))
                  }
                />
                {inputError.linkedin.length > 0 ? (
                  <div className="error">{inputError.linkedin}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="github">Github</label>
              <div className="errorUI">
                <input
                  name="github"
                  id="github"
                  value={EmployeeDetails.github}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      github: e.target.value,
                    }))
                  }
                />
                {inputError.github.length > 0 ? (
                  <div className="error">{inputError.github}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <p className="heading">Profile</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="role">Role</label>
              <div className="errorUI">
                <input
                  name="role"
                  id="role"
                  value={EmployeeDetails.role}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                />
                {inputError.role.length > 0 ? (
                  <div className="error">{inputError.role}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="expertise">Expertise</label>
              <div className="errorUI">
                <input
                  name="expertise"
                  id="expertise"
                  value={EmployeeDetails.expertise}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      expertise: e.target.value,
                    }))
                  }
                />
                {inputError.expertise.length > 0 ? (
                  <div className="error">{inputError.expertise}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="experience">Experience In Years</label>
              <div className="errorUI">
                <input
                  name="experience"
                  id="experience"
                  value={EmployeeDetails.experience}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                />
                {inputError.experience.length > 0 ? (
                  <div className="error">{inputError.experience}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="availability">Availability</label>
              <select
                name="availability"
                value={EmployeeDetails.availability}
                onChange={(e) =>
                  setEmployeeDetails((prev) => ({
                    ...prev,
                    availability: e.target.value,
                  }))
                }
              >
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
              </select>
            </div>
            <div
              className="formInput"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <label htmlFor="Skills">Skills</label>
                <div className="errorUI">
                  <input
                    type="text"
                    name="Skills"
                    value={Skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                  {inputError.skills.length > 0 ? (
                    <div className="error">{inputError.skills}</div>
                  ) : (
                    <></>
                  )}
                </div>
                <input
                  type="button"
                  className="addSkillBtn"
                  onClick={AddSkills}
                  value={"Add More"}
                ></input>
              </div>

              <div className="skillArray">
                {EmployeeDetails.skills.length > 0 ? (
                  EmployeeDetails.skills.map((skill) => (
                    <div className="skills">
                      {skill}
                      <input
                        type="button"
                        className="removeSkillBtn"
                        onClick={(e) => removeSkill(skill, e)}
                        value={"x"}
                      ></input>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="heading">Education</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="education">Degree</label>
              <select
                name="education"
                value={EmployeeDetails.education[0].degree} // Access the first element of the education array
                onChange={(e) =>
                  setEmployeeDetails((prev) => {
                    const education = [...prev.education];
                    education[0] = { ...education[0], degree: e.target.value };
                    return { ...prev, education: education };
                  })
                }
              >
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="BE">BE</option>
                <option value="ME">ME</option>
              </select>
            </div>
            <div className="formInput">
              <label htmlFor="specialization">specialization</label>
              <select
                name="specialization"
                value={EmployeeDetails.education[0].field} // Access the first element of the education array
                onChange={(e) =>
                  setEmployeeDetails((prev) => {
                    const education = [...prev.education];
                    education[0] = { ...education[0], field: e.target.value };
                    return { ...prev, education: education };
                  })
                }
              >
                {fieldArray.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
            <div className="formInput">
              <label htmlFor="institute">Institute</label>
              <div className="errorUI">
                <input
                  name="institute"
                  id="institute"
                  value={EmployeeDetails.education[0].institution} // Access the first element of the education array
                  onChange={(e) =>
                    setEmployeeDetails((prev) => {
                      const education = [...prev.education];
                      education[0] = {
                        ...education[0],
                        institution: e.target.value,
                      };
                      return { ...prev, education: education };
                    })
                  }
                />
                {inputError.education[0].institution.length > 0 ? (
                  <div className="error">
                    {inputError.education[0].institution}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="PassYear">Year Of Graduation</label>
              <div className="errorUI">
                <input
                  type="date"
                  name="PassYear"
                  id="PassYear"
                  value={
                    EmployeeDetails.education[0].year
                      ? new Date(EmployeeDetails.education[0].year)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  } // Format date for input
                  onChange={(e) =>
                    setEmployeeDetails((prev) => {
                      const education = [...prev.education];
                      education[0] = { ...education[0], year: e.target.value };
                      return { ...prev, education: education };
                    })
                  }
                />
                {inputError.education[0].year.length > 0 ? (
                  <div className="error">{inputError.education[0].year}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="heading">Projects</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="projectName">Project Name</label>
              <div className="errorUI">
                <input
                  name="projectName"
                  id="projectName"
                  value={EmployeeDetails.projects[0].projectName}
                  onChange={(e) =>
                    setEmployeeDetails((prev) => {
                      const projects = [...prev.projects]; // Create a shallow copy of the projects array
                      projects[0] = {
                        ...projects[0],
                        projectName: e.target.value,
                      }; // Update projectName
                      return { ...prev, projects }; // Return the updated state
                    })
                  }
                />
                {inputError.projects[0].projectName.length > 0 ? (
                  <div className="error">
                    {inputError.projects[0].projectName}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="projectDetails">Project Details</label>
              <div className="errorUI">
              <input
                type="textarea"
                name="ProjectDetails"
                id="ProjectDetails"
                value={EmployeeDetails.projects[0].projectDetails}
                onChange={(e) =>
                  setEmployeeDetails((prev) => {
                    const projects = [...prev.projects]; // Create a shallow copy of the projects array
                    projects[0] = {
                      ...projects[0],
                      projectDetails: e.target.value,
                    }; // Update projectName
                    return { ...prev, projects }; // Return the updated state
                  })
                }
              />
                {inputError.projects[0].projectDetails.length>0?<div className="error">{inputError.projects[0].projectDetails}</div>:<></>}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="ProjectYear">ProjectYear</label>
              <div className="errorUI">
              <input
                type="date"
                name="ProjectYear"
                id="ProjectYear"
                value={EmployeeDetails.projects[0].projectYear}
                onChange={(e) =>
                  setEmployeeDetails((prev) => {
                    const projects = [...prev.projects]; // Create a shallow copy of the projects array
                    projects[0] = {
                      ...projects[0],
                      projectYear: e.target.value,
                    }; // Update projectName
                    return { ...prev, projects }; // Return the updated state
                  })
                }
              />
                {inputError.projects[0].projectYear.length>0?<div className="error">{inputError.projects[0].projectYear}</div>:<></>}
              </div>
              
            </div>

            <div className="formInput">
              <label htmlFor="ProjectUsed">Where You Used it?</label>
              <div className="errorUI">
              <input
                name="ProjectUsed"
                id="ProjectUsed"
                value={EmployeeDetails.projects[0].projectUsed}
                onChange={(e) =>
                  setEmployeeDetails((prev) => {
                    const projects = [...prev.projects]; // Create a shallow copy of the projects array
                    projects[0] = {
                      ...projects[0],
                      projectUsed: e.target.value,
                    }; // Update projectName
                    return { ...prev, projects }; // Return the updated state
                  })
                }
              />
                {inputError.projects[0].projectUsed.length>0?<div className="error">{inputError.projects[0].projectUsed}</div>:<></>}
              </div>
              
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="projectUrl">Project Link</label>
              <div className="errorUI">
              <input
                type="text"
                name="projectUrl"
                id="projectUrl"
                value={EmployeeDetails.projects[0].projectUrl}
                onChange={(e) =>
                  setEmployeeDetails((prev) => {
                    const projects = [...prev.projects]; // Create a shallow copy of the projects array
                    projects[0] = {
                      ...projects[0],
                      projectUrl: e.target.value,
                    }; // Update projectName
                    return { ...prev, projects }; // Return the updated state
                  })
                }
              />
                {inputError.projects[0].projectUrl.length>0?<div className="error">{inputError.projects[0].projectUrl}</div>:<></>}
              </div>
              
            </div>
            <div className="formInput">
              <label htmlFor="role">Role</label>
              <div className="errorUI">
              <input
                type="text"
                name="role"
                id="role"
                value={EmployeeDetails.projects[0].role}
                onChange={(e) =>
                  setEmployeeDetails((prev) => {
                    const projects = [...prev.projects]; // Create a shallow copy of the projects array
                    projects[0] = { ...projects[0], role: e.target.value }; // Update projectName
                    return { ...prev, projects }; // Return the updated state
                  })
                }
              />
                {inputError.projects[0].role.length>0?<div className="error">{inputError.projects[0].role}</div>:<></>}
              </div>
              
            </div>
          </div>
        </div>
        <hr />
        <p className="heading">Others</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="languages">Languages</label>
              <div className="errorUI">
                <div className="formInput">
                <div className="formInput">
                <input
                  type="checkbox"
                  value="english"
                  checked={EmployeeDetails.languages.includes("english")}
                  onChange={handleLanguageChange}
                />
                <p>English</p>
              </div>
              <div className="formInput">
                <input
                  type="checkbox"
                  value="hindi"
                  checked={EmployeeDetails.languages.includes("hindi")}
                  onChange={handleLanguageChange}
                />
                <p>Hindi</p>
              </div>
              <div className="formInput">
                <input
                  type="checkbox"
                  value="spanish"
                  checked={EmployeeDetails.languages.includes("spanish")}
                  onChange={handleLanguageChange}
                />
                <p>Spanish</p>
              </div>
                </div>
                {inputError.languages.length>0?<div className="error">{inputError.languages}</div>:<></>}
              </div>
              
              
            </div>
            <div className="formInput">
              <label htmlFor="Interest">Interest</label>
              <div className="errorUI">
              <input
                name="Interest"
                id="Interest"
                value={Interest}
                onChange={(e) => setInterest(e.target.value)}
              />
                {inputError.interests.length>0?<div className="error">{inputError.interests}</div>:<></>}
              </div>
              
              <input
                type="button"
                className="addSkillBtn"
                onClick={AddInterest}
                value={"Add More"}
              ></input>
            </div>
            <div
              className="formInput"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div className="skillArray">
                {EmployeeDetails.interests.length > 0 ? (
                  EmployeeDetails.interests.map((interest) => (
                    <div className="skills">
                      {interest}
                      <input
                        type="button"
                        className="removeSkillBtn"
                        onClick={(e) => RemoveInterest(interest, e)}
                        value={"x"}
                      ></input>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label htmlFor="Achievements">Achievements (if any) </label>
              <div className="errorUI">
              <input
                name="Achievements"
                id="Achievements"
                value={EmployeeDetails.achievements}
                onChange={(e) =>
                  setEmployeeDetails((prev) => ({
                    ...prev,
                    achievements: e.target.value,
                  }))
                }
              />
                {inputError.achievements.length>0?<div className="error">{inputError.achievements}</div>:<></>}
              </div>
              
            </div>
          </div>
        </div>
        <hr />
        <div>
          {!id ? (
            <button className="submitBtn" onClick={CreateUser}>
              Create User
            </button>
          ) : (
            <button className="submitBtn" onClick={UpdateUser}>
              Update User
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
