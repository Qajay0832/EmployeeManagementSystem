import React from "react";
import { BrowserRouter } from "react-router-dom";
import Endpoints from "./routes/Endpoints";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="nav">
        <Navbar />
      </div>
      <Endpoints />
    </BrowserRouter>
  );
};

export default App;

// provide a way to view and manage user create update delete
