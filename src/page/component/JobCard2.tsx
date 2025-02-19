import React from "react";
import Temp from "./../../assets/logo_binus.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { JobVacancy } from "../student-page/HomePage";
import TimeIcon from "../component/TimeIcon";

interface JobCard2Props {
  jobVacancy: JobVacancy;
  jobApplyCount: number;
}

const JobCard2: React.FC<JobCard2Props> = ({ jobVacancy, jobApplyCount }) => {
  return (
    <div className="border-2 p-6 shadow-md w-full rounded-xl mb-8 flex flex-col md:flex-row items-start md:items-center md:max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <div className="mr-0 md:mr-8 w-full">
          <div className="flex flex-col md:flex-row mb-2 justify-between items-start md:items-center">
            <div className="flex flex-col justify-center">
              <div className="text-red-600 font-semibold flex items-center">
                <div className="mr-2">
                  <TimeIcon  />
                </div>
                {Math.ceil(
                  (new Date(jobVacancy?.endDateTime).getTime() -
                    new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                ) <= 0
                  ? "Ended"
                  : Math.ceil(
                      (new Date(jobVacancy?.endDateTime).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    ).toString() + " Days Left"}
              </div>
              <div className="text-xl md:text-2xl font-semibold mb-2 truncate">
                {jobVacancy?.jobPosition}
              </div>
            </div>
          </div>
          <div className="mb-4 h-auto md:h-[50px] overflow-hidden text-ellipsis line-clamp-2">
            {jobVacancy?.jobDescription}
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to={"/vacancy-applier/" + jobVacancy?.id}>
            <Button className="w-full md:w-[120px] hover:scale-105">View Detail</Button>
          </Link>
        </div>
      </div>
      <div className="font-semibold mt-4 md:mt-0">{jobApplyCount} people applied</div>
    </div>
  );
};

export default JobCard2;