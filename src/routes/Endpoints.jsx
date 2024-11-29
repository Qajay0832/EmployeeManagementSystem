import React from "react";
import { Route, Routes } from 'react-router-dom'
import CreateUser from "../components/CreateUser";
import UserList from "../pages/dashborad/UserList";
import UserProfile from "../components/UserProfile";

const Endpoints = () => {
  return (
    <Routes>
      <Route exact path="/" element={<UserList />} />
      <Route path="/createuser/:id?" element={<CreateUser />} />
      <Route path="/profile/:id" element={<UserProfile/>}/>
    </Routes>
  );
};

export default Endpoints;
