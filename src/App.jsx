import React from "react";
import { BrowserRouter } from "react-router-dom";
import Endpoints from "./routes/Endpoints";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="nav">
        <Navbar />
      </div>
      <Endpoints />
     
        <Footer/>
      
    </BrowserRouter>
  );
};

export default App;

// provide a way to view and manage user create update delete
