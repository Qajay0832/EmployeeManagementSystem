import React from "react";
import { BrowserRouter } from "react-router-dom";
import Endpoints from "./routes/Endpoints";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <div className="nav">
          <Navbar />
        </div>
        <div className="pageContainer">
          <Endpoints />
        </div>
        <div className="foot">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

// provide a way to view and manage user create update delete
