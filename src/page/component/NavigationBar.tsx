import React, { useState } from "react";
import LogoBinus from "../../assets/logo_header.png";
import { Link, useLocation } from "react-router-dom";
import ProfileHeader from "./../component/ProfileHeader";
import Cookies from "js-cookie";
import { decrypt } from "../util/Utility";

function NavigationBar() {
  const location = useLocation();
  const [student, setStudent] = useState(
    decrypt(Cookies.get("is_microsoft")) == "true" ? true : false
  );

  return (
    <div className="w-full h-full flex px-[60px] items-center shadow-md">
      <div className="flex items-center mr-[32px]">
        <img src={LogoBinus} className="w-[100px]" />
      </div>

      {student ? (
        <div className="flex items-center">
          <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/home"
                ? "underline underline-offset-8"
                : ""
            }`}
            to={"/home"}
          >
            <div className="flex items-center">
              <div className="ml-2">Home</div>
            </div>
          </Link>
          <Link
            className={`mx-[30px] text-[18px] font-medium transition ${
              location.pathname === "/browse-job"
                ? "underline underline-offset-8"
                : ""
            }  hover:underline underline-offset-8 `}
            to={"/browse-job"}
          >
            Job
          </Link>
          <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/browse-company"
                ? "underline underline-offset-8"
                : ""
            }`}
            to={"/browse-company"}
          >
            Company
          </Link>
          <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/student/requests"
                ? "underline underline-offset-8"
                : ""
            }`}
            to={"/student/requests"}
          >
            Request
          </Link>
        </div>
      ) : (
        <div>
          <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/company/home"
                ? "underline underline-offset-8"
                : ""
            }`}
            to={"/company/home"}
          >
            Home
          </Link>
          <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/company/vacancy"
                ? "underline underline-offset-8"
                : ""
            }`}
            to={"/company/vacancy"}
          >
            Company Vacancy
          </Link>
          <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/company/browse-student"
                ? "underline underline-offset-8"
                : ""
            } `}
            to={"/company/browse-student"}
          >
            Students
          </Link>
          <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/company/reach-out"
                ? "underline underline-offset-8"
                : ""
            } `}
            to={"/company/reach-out"}
          >
            History
          </Link>
          {/* <Link
            className={`mx-[30px] text-[18px] font-medium ${
              location.pathname === "/student/requests"
                ? "underline underline-offset-8"
                : ""
            }`}
            to={"/company/requests"}
          >
            Request
          </Link> */}
        </div>
      )}

      <div className="ml-auto">
        <ProfileHeader />
      </div>
    </div>
  );
}

export default NavigationBar;
