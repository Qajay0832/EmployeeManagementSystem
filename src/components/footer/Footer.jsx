import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import LinkedinIcon from "../../assests/linkedinIcon.svg";
import GithubIcon from "../../assests/githubIcon.svg";
import InstagramIcon from "../../assests/instagramIcon.svg";
import FacebookIcon from "../../assests/facebookIcon.svg";
import brand from "../../assests/brandIcon.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate()
  return (
    <div className="footerContainer">
      <div className="footersecOne">
        <div className="footerLinks">
          <a href={""}>
            <img className="footerLink" src={LinkedinIcon} />
          </a>
          <a href={""}>
            <img className="footerLink footergit" src={GithubIcon} />
          </a>
          <a href={""}>
            <img className="footerLink" src={InstagramIcon} />
          </a>
          <a href={""}>
            <img className="footerLink" src={FacebookIcon} />
          </a>
        </div>
        <div className="footernavLinks">
          <Link className="footernavLink" to={"/"}>
            Employee Directory
          </Link>
          <Link className="footernavLink" to={"/createuser"}>
            Create
          </Link>
          <div className="footernavLink" onClick={()=>{navigate(`/profile/${7}`)}}>
            About
          </div>
        </div>
        <p className="footerTech">
          REACT&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp;
          &nbsp;NODEJS&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp;
          &nbsp;MONGODB&nbsp; &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp;
          &nbsp;EXPRESS
        </p>
      </div>
      <div className="footersecTwo">
        <div></div>
        <div>
          <p className="footerTitle">
            EMPLOYEE MANAGEMENT SYSTEM , MANAGING & MAINTAING EMPLOYEES
          </p>
          <p className="footerRights">
            @JABALPUR EMS | ALL RIGHTS RESERVED &nbsp; | &nbsp; CONTACT&nbsp;
            &nbsp;:&nbsp; &nbsp; QAJAY0832@GMAIL.COM
          </p>
        </div>
        <div className="footerBrand">
          <div className="brandContainer">
            <img className="brandIcon" src={brand} />
            <div className="brandName">EMS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
