import React, { useEffect } from "react";
import Temp from "./../../assets/logo_binus.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CompanyVacancyWithApplyCountProps, VacancyProps } from "../props/CompanyVacancyProps";

const CompanyVacancy: React.FC<VacancyProps> = ({
  jobVacancy,
  jobApplyCount,
}) => {
  return (
    <div className="border-2 p-6 shadow-md w-full rounded-xl mb-8 ">
      <div className="flex justify-between items-center">
        <div className="mr-8 w-full">
          <div className="flex mb-2 justify-between items-center">
            <div>
              <div className="text-[red] font-semibold">
                {Math.ceil(
                  (new Date(jobVacancy.endDateTime).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                Days Left
              </div>
              <div className="text-[24px] font-semibold">
                {jobVacancy.jobPosition}
              </div>
              {/* <div className="text-[16px]">at {jobVacancy.company.name}</div> */}
              <div className="text-[16px]">{jobVacancy.salaryRange}</div>
            </div>

            <div>
              <img src={jobVacancy.company.logourl} className="h-[55px]" />
            </div>
          </div>
          <div
            className="mb-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {jobVacancy.jobDescription}
          </div>
          <div className="font-semibold">
            {jobApplyCount.toString()} people apply to this job vacancy
          </div>
        </div>

        <div className="ml-8">
          <div>
            <Link to={"/company/" + jobVacancy.companyId}>
              <Button className="transition w-[120px] hover:scale-105">
                View Company
              </Button>
            </Link>
          </div>
          <div>
            <Link to={"/job-detail/" + jobVacancy.id}>
              <Button className="mt-2 transition w-[120px] hover:scale-105">
                View Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyVacancy;
