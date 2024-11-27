import React, { useEffect, useState } from "react";
import UsersTable from "./UserTable";

const UserList = () => {

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
  const [showColumn, setShowColumn] = useState([]);
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
  useEffect(() => {
    fetchEmployees();
  }, []);
  if(showColumn.length==0){
    return "Loading"
  }
  return <UsersTable columns={columns} data={showColumn} />;
};

export default UserList;
