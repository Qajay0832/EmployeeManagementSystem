import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./createUser.css";

const CreateUser = () => {
  const navigate = useNavigate();

  // on basis of this id if available we display either we have to create or update employee
  const { id } = useParams();

  //managing employeeDetails throught state
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

  const [Interest, setInterest] = useState("");
  const [Skill, setSkill] = useState("");

  // based on this state we decide either we have show Error on click of submit
  const [showError, setShowError] = useState(false);

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
      setInterest(""); // Clear the input field after adding
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

  // these are the api call either we create or update employee
  // as if we need to update employee we need details of employee for that call api fetch based on employee id
  const createEmployee = async () => {
    try {
      await fetch("https://employeemanagementsystemnode.onrender.com/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EmployeeDetails }),
      });
      // navigate(`/`)
    } catch (error) {
      console.log(error);
    }
  };
  const updateEmployee = async () => {
    try {
      await fetch(`https://employeemanagementsystemnode.onrender.com/employee/${id}`, {
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

  //Validation function based on requirement using regex and conditional statements
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
  const ValidateArray = (input, name) => {
    if (input.length === 0) {
      return `please provide a ${name}`;
    } else if (input.length < (name == "skill" ? 3 : 2)) {
      return `Please enter atleast ${name == "skill" ? "3" : "2"} ${name}s`;
    } else {
      return "";
    }
  };

  // Validation function is validation check between on click of create or update employee and api calls
  const Validator = (event) => {
    if (
      EmployeeDetails.achievements.length === 0 ||
      EmployeeDetails.address.length === 0 ||
      ValidateArray(EmployeeDetails.interests, "interest").length > 0 ||
      ValidateArray(EmployeeDetails.languages, "language").length > 0 ||
      EmployeeDetails.projects[0].role.length === 0 ||
      ValidateUrl(
        EmployeeDetails.projects[0].projectUrl,
        EmployeeDetails.projects[0].projectName.length > 0
          ? EmployeeDetails.projects[0].projectName
          : "project"
      ).length > 0 ||
      EmployeeDetails.projects[0].projectUsed.length === 0 ||
      EmployeeDetails.projects[0].projectYear.length === 0 ||
      EmployeeDetails.projects[0].projectDetails.length === 0 ||
      EmployeeDetails.projects[0].projectName.length === 0 ||
      EmployeeDetails.education[0].year.length === 0 ||
      EmployeeDetails.education[0].institution.length === 0 ||
      ValidateArray(EmployeeDetails.skills, "skill").length > 0 ||
      ValidateExperience(EmployeeDetails.experience).length > 0 ||
      EmployeeDetails.expertise.length < 4 ||
      EmployeeDetails.role.length < 3 ||
      ValidateUrl(EmployeeDetails.github, "github").length > 0 ||
      ValidateUrl(EmployeeDetails.linkedin, "linkedin").length > 0 ||
      ValidatePhone(EmployeeDetails.phone).length > 0 ||
      ValidateEmail(EmployeeDetails.email).length > 0 ||
      EmployeeDetails.dob.length === 0 ||
      EmployeeDetails.gender.length === 0 ||
      ValidateName(EmployeeDetails.name).length > 0
    ) {
      setShowError(true);
      console.log("Error");
    } else {
      if (event === "create") {
        createEmployee();
      } else if (event === "update") {
        updateEmployee();
      }
    }
  };

  // this effect run when component mounted (or when id changes)
  // if we get id through params it will show ui and functionality of update
  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
    console.log("simple", id);
  }, [id]);

  // submit button calls of update and create hit the same function with single argument
  const CreateUser = (e) => {
    e.preventDefault();
    Validator("create");
  };
  const UpdateUser = (e) => {
    e.preventDefault();
    Validator("update");
  };
  return (
    <div className="createUserContainer">
      <form className="createUserForm">
        <p className="heading">Personal Details</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="name">
                Full Name
              </label>
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
                {showError && ValidateName(EmployeeDetails.name).length > 0 && (
                  <div className="formInput error">
                    {ValidateName(EmployeeDetails.name)}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="genderSec">
                <label className="formLabel" htmlFor="gender">
                  Gender
                </label>
                <div className="genderInputs">
                  <div
                    className="formInput genderInput"
                    style={{ gap: "0.5rem" }}
                  >
                    <input
                      type="radio"
                      className="genderRadio"
                      name="gender"
                      id="male"
                      value="Male"
                      checked={EmployeeDetails.gender === "Male"}
                      onChange={handleGenderChange}
                    />
                    <label className="genderLabel" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div
                    className="formInput genderInput"
                    style={{ gap: "0.5rem" }}
                  >
                    <input
                      type="radio"
                      className="genderRadio"
                      name="gender"
                      id="female"
                      value="Female"
                      checked={EmployeeDetails.gender === "Female"}
                      onChange={handleGenderChange}
                    />
                    <label className="genderLabel" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div
                    className="formInput genderInput"
                    style={{ gap: "0.5rem" }}
                  >
                    <input
                      type="radio"
                      className="genderRadio"
                      name="gender"
                      id="other"
                      value="Other"
                      checked={EmployeeDetails.gender === "Other"}
                      onChange={handleGenderChange}
                    />
                    <label className="genderLabel" htmlFor="other">
                      Other
                    </label>
                  </div>
                </div>

                {showError &&
                  (EmployeeDetails.gender.length > 0 ? (
                    <></>
                  ) : (
                    <div className="formInput error" style={{ gap: "0.5rem" }}>
                      Gender is Required
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="DOB">
                DOB
              </label>
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
                {showError &&
                  (EmployeeDetails.dob.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">Date of birth is Required</div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <label className="formLabel" htmlFor="MaritalStatus">
                MaritalStatus
              </label>
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
              <label className="formLabel" htmlFor="Address">
                Address
              </label>
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
                {showError &&
                  (EmployeeDetails.address.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      Please provide your permanent address
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="country">
                Country
              </label>
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
              <label className="formLabel" htmlFor="img">
                Upload Your Picture
              </label>
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
              <label className="formLabel" htmlFor="email">
                Email
              </label>
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
                {showError &&
                  (ValidateEmail(EmployeeDetails.email) > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      {ValidateEmail(EmployeeDetails.email)}
                    </div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <label className="formLabel" htmlFor="phone">
                Phone No.
              </label>
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
                {showError &&
                  (ValidatePhone(EmployeeDetails.phone) > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      {ValidatePhone(EmployeeDetails.phone)}
                    </div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <label className="formLabel" htmlFor="linkdin">
                Linkdin
              </label>
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
                {showError &&
                  (ValidateUrl(EmployeeDetails.linkedin, "linkedin") > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      {ValidateUrl(EmployeeDetails.linkedin, "linkedin")}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="github">
                Github
              </label>
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
                {showError &&
                  (ValidateUrl(EmployeeDetails.github, "github") > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      {ValidateUrl(EmployeeDetails.github, "github")}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <hr />

        <p className="heading">Profile</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="role">
                Role
              </label>
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
                {showError &&
                  (EmployeeDetails.role.length > 2 ? (
                    <></>
                  ) : (
                    <div className="error">Role is Required</div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <label className="formLabel" htmlFor="expertise">
                Expertise
              </label>
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
                {showError &&
                  (EmployeeDetails.expertise.length > 3 ? (
                    <></>
                  ) : (
                    <div className="error">Expertise is Required</div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <label className="formLabel" htmlFor="experience">
                Experience In Years
              </label>
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
                {showError &&
                  (ValidateExperience(EmployeeDetails.experience) > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      {ValidateExperience(EmployeeDetails.experience)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="availability">
                Availability
              </label>
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
            <div className="formInput">
              <div className="formInput">
                <label className="formLabel" htmlFor="Skills">
                  Skills
                </label>

                <div className="errorUI">
                  <div className="arrayInput">
                    <input
                      className="addSkillInput"
                      type="text"
                      name="Skills"
                      value={Skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                    <input
                      type="button"
                      className="addSkillBtn"
                      onClick={AddSkills}
                      value={"Add More"}
                    ></input>
                    <input
                      type="button"
                      className="addSkillBtnMobile"
                      onClick={AddSkills}
                      value={"Add"}
                    ></input>
                  </div>
                  {showError &&
                    (ValidateArray(EmployeeDetails.skills, "skill") > 0 ? (
                      <></>
                    ) : (
                      <div className="error">
                        {ValidateArray(EmployeeDetails.skills, "skill")}
                      </div>
                    ))}
                </div>
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
              <label className="formLabel" htmlFor="education">
                Degree
              </label>
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
              <label className="formLabel" htmlFor="specialization">
                specialization
              </label>
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
              <label className="formLabel" htmlFor="institute">
                Institute
              </label>
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
                {showError &&
                  (EmployeeDetails.education[0].institution.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">Please Provide Instiute name</div>
                  ))}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="PassYear">
                Year Of Graduation
              </label>
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
                {showError &&
                  (EmployeeDetails.education[0].year.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      Please Provide date of graduation
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="heading">Projects</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="projectName">
                Project Name
              </label>
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
                {showError &&
                  (EmployeeDetails.projects[0].projectName.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">Please Provide Project Name</div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <label className="formLabel" htmlFor="projectDetails">
                Project Details
              </label>
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
                {showError &&
                  (EmployeeDetails.projects[0].projectDetails.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">Please Provide Project Details</div>
                  ))}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="ProjectYear">
                ProjectYear
              </label>
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
                {showError &&
                  (EmployeeDetails.projects[0].projectYear.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">Please Provide Last Used Date</div>
                  ))}
              </div>
            </div>

            <div className="formInput">
              <label className="formLabel" htmlFor="ProjectUsed">
                Where You Used it?
              </label>
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
                {showError &&
                  (EmployeeDetails.projects[0].projectUsed.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      Please provide details where you used project!
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="projectUrl">
                Project Link
              </label>
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
                {showError &&
                  (ValidateUrl(
                    EmployeeDetails.projects[0].projectUrl,
                    EmployeeDetails.projects[0].projectName.length > 0
                      ? EmployeeDetails.projects[0].projectName
                      : "project"
                  ) > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      {ValidateUrl(
                        EmployeeDetails.projects[0].projectUrl,
                        EmployeeDetails.projects[0].projectName.length > 0
                          ? EmployeeDetails.projects[0].projectName
                          : "project"
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <label className="formLabel" htmlFor="role">
                Role
              </label>
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
                {showError &&
                  (EmployeeDetails.projects[0].role.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      Please provide your role in project!
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="heading">Others</p>
        <div className="formSec">
          <div className="innerSec">
            <div className="formInput">
              <label className="formLabel" htmlFor="languages">
                Languages
              </label>
              <div className="errorUI">
                <div className="formInput">
                  <div className="genderInputs">
                    <div className="formInput genderInput">
                      <input
                        type="checkbox"
                        className="genderRadio"
                        value="english"
                        checked={EmployeeDetails.languages.includes("english")}
                        onChange={handleLanguageChange}
                      />
                      <label className="genderLabel">English</label>
                    </div>
                    <div className="formInput genderInput">
                      <input
                        type="checkbox"
                        className="genderRadio"
                        value="hindi"
                        checked={EmployeeDetails.languages.includes("hindi")}
                        onChange={handleLanguageChange}
                      />
                      <label className="genderLabel">Hindi</label>
                    </div>
                    <div className="formInput genderInput">
                      <input
                        type="checkbox"
                        className="genderRadio"
                        value="spanish"
                        checked={EmployeeDetails.languages.includes("spanish")}
                        onChange={handleLanguageChange}
                      />
                      <label className="genderLabel">Spanish</label>
                    </div>
                  </div>
                </div>
                {showError &&
                  (ValidateArray(EmployeeDetails.languages, "language") > 0 ? (
                    <></>
                  ) : (
                    <div className="error">
                      {ValidateArray(EmployeeDetails.languages, "language")}
                    </div>
                  ))}
              </div>
            </div>
            <div className="formInput">
              <div className="formInput">
                <label className="formLabel" htmlFor="Interest">
                  Interest
                </label>
                <div className="errorUI">
                  <div className="arrayInput">
                    <input
                      className="addSkillInput"
                      name="Interest"
                      id="Interest"
                      value={Interest}
                      onChange={(e) => setInterest(e.target.value)}
                    />
                    <input
                      type="button"
                      className="addSkillBtn"
                      onClick={AddInterest}
                      value={"Add More"}
                    ></input>
                    <input
                      type="button"
                      className="addSkillBtnMobile"
                      onClick={AddInterest}
                      value={"Add"}
                    ></input>
                  </div>
                  {showError &&
                    (ValidateArray(EmployeeDetails.interests, "interest") >
                    0 ? (
                      <></>
                    ) : (
                      <div className="error">
                        {ValidateArray(EmployeeDetails.interests, "interest")}
                      </div>
                    ))}
                </div>
              </div>
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
              <label className="formLabel" htmlFor="Achievements">
                Achievements (if any){" "}
              </label>
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
                {showError &&
                  (EmployeeDetails.achievements.length > 0 ? (
                    <></>
                  ) : (
                    <div className="error">Please provide any achievement</div>
                  ))}
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
