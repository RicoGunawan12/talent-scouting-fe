import React, { useState } from "react";
import LogoBinus from "../../assets/logo_header.png";
import { Link, useLocation } from "react-router-dom";
import ProfileHeader from "../component/ProfileHeader";
import Cookies from "js-cookie";
import { decrypt } from "../util/Utility";
import { Menu, X } from "lucide-react";

function NavigationBar() {
  const location = useLocation();
  const [student, setStudent] = useState(
    decrypt(Cookies.get("is_microsoft")) === "true"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full shadow-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-[60px]">
        <div className="flex items-center mr-12">
          <img src={LogoBinus} className="w-[100px]" alt="Logo" />
        </div>
        
        {/* Hamburger Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {student ? (
            <>
              <NavLink to="/home" label="Home" location={location} />
              <NavLink to="/browse-job" label="Job" location={location} />
              <NavLink to="/browse-company" label="Company" location={location} />
              <NavLink to="/student/requests" label="Request" location={location} />
            </>
          ) : (
            <>
              <NavLink to="/company/home" label="Home" location={location} />
              <NavLink to="/company/vacancy" label="Company Vacancy" location={location} />
              <NavLink to="/company/browse-student" label="Students" location={location} />
              <NavLink to="/company/reach-out" label="History" location={location} />
            </>
          )}
        </div>

        <div className="hidden md:block ml-auto">
          <ProfileHeader />
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-white py-4">
          {student ? (
            <>
              <MobileNavLink to="/home" label="Home" toggleMenu={toggleMenu} />
              <MobileNavLink to="/browse-job" label="Job" toggleMenu={toggleMenu} />
              <MobileNavLink to="/browse-company" label="Company" toggleMenu={toggleMenu} />
              <MobileNavLink to="/student/requests" label="Request" toggleMenu={toggleMenu} />
            </>
          ) : (
            <>
              <MobileNavLink to="/company/home" label="Home" toggleMenu={toggleMenu} />
              <MobileNavLink to="/company/vacancy" label="Company Vacancy" toggleMenu={toggleMenu} />
              <MobileNavLink to="/company/browse-student" label="Students" toggleMenu={toggleMenu} />
              <MobileNavLink to="/company/reach-out" label="History" toggleMenu={toggleMenu} />
            </>
          )}
          <ProfileHeader />
        </div>
      )}
    </div>
  );
}

const NavLink = ({ to, label, location }) => (
  <Link
    className={`text-[18px] font-medium transition hover:underline underline-offset-8 ${
      location.pathname === to ? "underline underline-offset-8" : ""
    }`}
    to={to}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, toggleMenu }) => (
  <Link
    className="block py-2 text-[18px] font-medium hover:underline"
    to={to}
    onClick={toggleMenu}
  >
    {label}
  </Link>
);

export default NavigationBar;
