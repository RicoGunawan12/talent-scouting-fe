import React from "react";
import { JobCardProps } from "../props/JobCardProps";
import Temp from "./../../assets/logo_binus.png";
import { Link } from "react-router-dom";

const JobCard: React.FC<JobCardProps> = ({
  JobName,
  CompanyName,
  Image,
  Id,
}) => {
  return (
    <Link to={"/job-detail/" + Id} className="border-2 rounded-md py-6 px-2">
      <div className="flex justify-center mb-6">
        <img
          src={Image}
          className="w-[200px] h-[120px] object-cover object-center"
        />
      </div>
      <div className="text-center text-[16px] font-semibold">{JobName}</div>
      <div className="text-center">{CompanyName}</div>
    </Link>
  );
};

export default JobCard;
