import React from "react";
import { CompanyCardProps } from "../props/CompanyCardProps";
import Temp from "./../../assets/logo_binus.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const JobCard: React.FC<CompanyCardProps> = ({
  Id,
  Name,
  LogoUrl,
  Location,
  Description,
  VacancyCount,
}) => {
  const truncateMultilineStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  return (
    <div className="border-2 px-8 pb-10 pt-4 shadow-md rounded-xl w-full">
      <div>
        <div className="min-h-[28vh]">
          <div className="flex justify-between items-center h-[12vh]">
            <div className="flex items-center">
              <div className="mr-6">
                <img src={LogoUrl} className="w-[80px]" />
              </div>

              <div>
                <div
                  className="text-[1.5vw] font-semibold w-full"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                  }}
                >
                  {Name}
                </div>
                <div
                  className="text-[#838383]"
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {Location}
                </div>
              </div>
            </div>

            {/* <div className='text-[#0E6700] w-[150px] text-center rounded-xl'>
                            <div className='text-[22px]'>{VacancyCount.toString()}</div>
                            <div>Jobs Available</div>
                        </div> */}
          </div>

          <div
            className="my-4"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {Description}
          </div>
        </div>
        {/* <div className='bg-[#b2ffb2] text-[#0E6700] w-[150px] text-center rounded-xl'>{VacancyCount.toString()} Jobs Available</div> */}

        <div className="flex justify-between mt-4">
          <div className="text-[#0E6700] text-center items-center flex">
            {/* <div className="text-[16px] bg-[#b2ffb2] px-3 py-1 rounded-lg">
              {VacancyCount?.toString()} Jobs Available
            </div> */}
          </div>
          <Link to={"/company/" + Id}>
            <Button className="transition hover:scale-105">View Company</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
