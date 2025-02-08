"use client";

import { TCV } from "@/page/props/cv";
import FirstTemplateEducation from "./_components/first-template-education";
import FirstTemplateExperience from "./_components/first-template-experience";
import FirstTemplateProfile from "./_components/first-template-profile";
import FirstTemplateProject from "./_components/first-template-project";
import FirstTemplateSkill from "./_components/first-template-skill";

export default function FirstTemplate({ cv = null }: { cv?: TCV | null }) {
  return (
    <>
      <div className="w-full h-full flex flex-col font-sans">
        <FirstTemplateProfile profile={cv?.profile} />
        <hr className="w-full border-primary my-2" />
        <div className="flex justify-between gap-4 w-full">
          <div className="w-[70%] flex flex-col">
            <FirstTemplateExperience savedExperiences={cv?.experiences} />
            <FirstTemplateProject savedProjects={cv?.projects} />
          </div>
          <div className="w-[30%] pl-2 flex flex-col items-start">
            <FirstTemplateSkill savedSkills={cv?.skills} />
            <FirstTemplateEducation savedEducations={cv?.educations} />
          </div>
        </div>
      </div>
    </>
  );
}
