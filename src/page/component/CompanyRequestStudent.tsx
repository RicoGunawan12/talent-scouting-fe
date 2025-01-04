import React from "react";
import Temp from "./../../assets/logo_binus.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Company } from "../company-page/CompanyReachoutPage";

function AppliedRequestStudent({
    id,
    name,
    logoUrl,
    description,
    location,
    email,
    message
  }:
  {
    id: string;
    name: string;
    logoUrl: string;
    description: string;
    location: string;
    email: string;
    message: string
  }
) {
  return (
    <Link
      to={"/company/" + id}
      className="flex justify-between items-center py-8 border-b-[1px] border-gray-400 px-8"
    >
      <div className="flex items-center">
        <img src={logoUrl} className="object-cover object-center" width={150} height={150} />
        <div className="ml-6">
          <div className="text-xl font-semibold">{name}</div>
          <div>{location}</div>
          <div>{email}</div>

          <div className="mt-4">Message: </div>
          <div>{message}a</div>
        </div>
      </div>

      {/* <div className="flex gap-4">
        <Button className="bg-green-700 hover:bg-green-800">Accept</Button>
        <Button className="bg-red-600 hover:bg-red-800">Reject</Button>
      </div> */}
    </Link>
  );
}

export default AppliedRequestStudent;
