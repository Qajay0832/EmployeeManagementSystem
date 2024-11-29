import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkedinIcon from "../../assests/linkedinIcon.svg";
import GithubIcon from "../../assests/githubIcon.svg";
import "./userTable.css";

const UsersTable = ({ columns, data }) => {
  const navigate = useNavigate();
  console.log(columns, data);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const sortedData = [...data].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  const filteredData = sortedData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery) ||
      row.role.toLowerCase().includes(searchQuery)
  );
  // Group the data by the starting letter of the 'name'
  const groupedData = filteredData.reduce((groups, row) => {
    const firstLetter = row.name[0].toUpperCase(); // Get the first letter of the name
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(row);
    return groups;
  }, {});

  // Flatten the grouped data into an array of rows, with the alphabet letter as a row
  const rowsWithAlphabet = Object.keys(groupedData).map((letter) => ({
    alphabet: letter,
    data: groupedData[letter],
  }));

  const ShowProfile = (id, column) => {
    if (column.accessor === "links") {
      return;
    }
    navigate(`/profile/${id}`);
  };
  const [expandedGroup, setExpandedGroup] = useState(
    Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index))
  );

  // Function to handle the click on an alphabet row
  const handleAlphabetClick = (alphabet) => {
    // Toggle the expanded state
    setExpandedGroup((prevState) =>
      prevState.includes(alphabet)
        ? prevState.filter((group) => group !== alphabet)
        : [...prevState, alphabet]
    );
  };

  const Cell = (row, name) => {
    if (name == "active") {
      return (
        <div className="statusContainer">
          <>
            <div className={`activeColor ${row[name] ? "" : "inactive"}`}></div>
          </>
          <div className={`status ${row[name] ? "active" : "inactive"}`}>{`${
            row[name] ? "Active" : "Inactive"
          }`}</div>
        </div>
      );
    } else if (name == "links") {
      return (
        <div className="linksContainer">
          <a href={row["linkedin"]}>
            <img className="tableLink" src={LinkedinIcon} />
          </a>
          <a href={row["github"]}>
            <img className="tableLink" src={GithubIcon} />
          </a>
        </div>
      );
    } else if (name == "name") {
      // console.log(row);

      return (
        <div className="tableImgContainer">
          <img
            className="tableImg"
            src="https://i.pinimg.com/564x/1b/c4/cf/1bc4cfd51b933c18e8016e977c432a24.jpg"
            alt="H"
          />
          {row["name"]}
        </div>
      );
    }
  };
  return (
    <div className="userTableContainer">
      {/* <LinkedinIcon/> ese hi hota h */}
      <div className="searchContainer">
        <input
          className="tableSearchInput"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Name or Role..."
        />
        <button className="tableSearchBtn">Search</button>
      </div>
      <table className="table">
        <thead className="tableHead">
          <tr>
            {/* Render column headers using the 'Header' property */}
            {columns.map((column, index) => (
              <th key={index}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="tableBody">
          {/* Render rows based on data */}
          {/* Render the alphabet row, followed by the data rows */}
          {rowsWithAlphabet.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {/* Render the alphabet row */}
              <tr>
                <td
                  colSpan={columns.length}
                  className="alphabetRow"
                  onClick={() => handleAlphabetClick(group.alphabet)}
                >
                  {group.alphabet} {/* Alphabet Row */}
                  <div>{expandedGroup.includes(group.alphabet) ? "" : ""}</div>
                </td>
              </tr>

              {/* Render the actual data rows */}
              {/* {setPage(pagination(group.alphabet,group.data))} */}
              {expandedGroup.includes(group.alphabet) &&
                group.data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="tableRow">
                    {columns.map((column, columnIndex) => {
                      return (
                        <td
                          key={columnIndex}
                          className="routeRows"
                          onClick={() => ShowProfile(row.id, column)}
                        >
                          {column.accessor === "links" ||
                          column.accessor === "active" ||
                          column.accessor === "name"
                            ? Cell(row, column.accessor)
                            : row[column.accessor]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
