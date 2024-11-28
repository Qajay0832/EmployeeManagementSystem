import React, { useEffect, useState } from "react";
import UsersTable from "./UserTable";

const UserList = () => {
  // Table Headers
  const columns = [
    {
      Header: "UserId",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "name", // accessor is the key for the data field
    },
    {
      Header: "Role",
      accessor: "role",
    },
  ];
  // state for managing table rows
  const [showColumn, setShowColumn] = useState([]);
  // fetcing each and every employee present in db
  const fetchEmployees = async () => {
    try {
      const response = await fetch("https://employeemanagementsystemnode.onrender.com/employee");
      const jsonColumn = await response.json();
      
      setShowColumn(jsonColumn.filter((e) => e.id != 0));
    } catch (error) {
      console.log(error);
      setShowColumn([])
    }
  };
  // api call on component mount
  useEffect(() => {
    fetchEmployees();
  }, []); 
  if(showColumn.length==0){
    return "Loading" // loader is not implement yet
  }
  return <UsersTable columns={columns} data={showColumn} />;
};

export default UserList;
