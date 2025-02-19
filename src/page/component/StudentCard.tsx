import React from "react";
import { Student } from "../company-page/BrowseStudentPage";
import { Link } from "react-router-dom";

const StudentCard: React.FC<Student> = ({ id, name, major, pictureUrl, gpa }) => {
  return (
    <Link
      to={`/company/student-profile/${id}`}
      className="border-2 rounded-md p-6 w-full sm:w-[48%] md:w-[30%] lg:w-[22%] h-auto flex flex-col items-center shadow-md hover:shadow-lg transition mx-auto"
    >
      <div className="flex justify-center mb-2">
        <img
          src={pictureUrl}
          alt={name}
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
      </div>
      <div className="mb-2 text-center">
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm">{major}</div>
        <div className="text-sm">GPA: {gpa}</div>
      </div>
      <div className="text-sm my-2 text-center">
        <div className="mb-1">Strong positions:</div>
        <div className="flex flex-wrap gap-2 justify-center">
          <span className="bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 rounded-md">Front End Developer</span>
          <span className="bg-green-50 px-2 py-1 text-xs font-medium text-green-700 rounded-md">AI Engineer</span>
          <span className="bg-red-50 px-2 py-1 text-xs font-medium text-red-700 rounded-md">Back End Developer</span>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
