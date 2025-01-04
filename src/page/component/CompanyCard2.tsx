import React from "react";
import { CompanyCardProps } from "../props/CompanyCardProps";
import Temp from "./../../assets/logo_binus.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const JobCard: React.FC<CompanyCardProps> = ({
  Name,
  LogoUrl,
  Location,
  Description,
  VacancyCount,
}) => {
  return (
    <div className="border-2 px-4 py-4 shadow-md w-full">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-6">
              <div className="text-[18px] font-semibold">{Name}</div>
              <div className="text-[#838383]">{Location}</div>
            </div>

            <div>
              <div className="bg-[#90F2AC] text-[#0E6700] py-[1px] px-[4px] text-[14px] text-center rounded-xl">
                {VacancyCount ? VacancyCount.toString() : "0"} Jobs
              </div>
            </div>
          </div>

          <div>
            <img src={LogoUrl} width={100} />
          </div>
        </div>

        <div className="my-4">
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
          dolor sit amet Lorem ipsum dolor sit amet
        </div>

        <div className="flex justify-center">
          <Link to={"/company-detail"}>
            <Button className="mt-4 transition hover:scale-105">
              View Company
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
