import React from "react";
import { JobRecommendationProps } from "../props/JobRecommendationProps";

const JobRecommendationCard: React.FC<JobRecommendationProps> = ({
  JobName,
  Index,
}) => {
  return (
    <div className="relative w-[20vw] h-[8vh] rounded-md border-2 flex justify-center items-center">
      <div className="absolute bg-[#CFF1FF] text-[#0047FF] px-2 rounded-md text-[12px] font-bold top-[-10px] left-[10%]">
        Recommended
      </div>

      <div className="font-semibold text-[18px]">{JobName}</div>
    </div>
  );
};

export default JobRecommendationCard;
