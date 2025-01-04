import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Input } from "@/components/ui/input";
import JobCard2 from "../component/JobCard2";
import StudentCard from "../component/StudentCard";
import { StudentCardProps } from "../props/StudentCardProps";
import { CompanyVacancyWithApplyCountProps, VacancyResponse } from "../props/CompanyVacancyProps.ts";
import "aos/dist/aos.css";
import AOS from "aos";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
import Cookies from "js-cookie";
import { decrypt } from "../util/Utility.tsx";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Student } from "./BrowseStudentPage.tsx";
import { JobVacancy } from "../student-page/HomePage.tsx";

export interface User {
  Id: string;
  Email: string;
  Password: string;
  Role: string;
  CreatedAt: string; // ISO 8601 formatted date
  UpdatedAt: string; // ISO 8601 formatted date
  DeletedAt: string | null; // ISO 8601 formatted date or null
}

export interface Company {
  Id: string;
  UserId: string;
  Name: string;
  LogoUrl: string;
  Description: string;
  Location: string;
  CreatedAt: string; // ISO 8601 formatted date
  UpdatedAt: string; // ISO 8601 formatted date
  DeletedAt: string | null; // ISO 8601 formatted date or null
  User: User;
}

export interface JobType {
  Id: number;
  JobTypeName: string;
  CreatedAt: string; // ISO 8601 formatted date
}

export interface Skill {
  Id: number;
  SkillName: string;
  CreatedAt: string; // ISO 8601 formatted date
}

export interface JobVacancySkill {
  JobVacancyId: string;
  SkillId: number;
  Skill: Skill;
  SkillDetail: string;
}

export interface JobVacancyResponsibility {
  Id: number;
  JobVacancyId: string;
  ResponsibilityDetail: string;
}

export interface ExtraInfo {
  Id: number;
  ExtrasTitle: string;
  ExtrasDescription: string;
  JobVacancyId: string;
}

export interface JobVacancy2 {
  Id: string;
  CompanyId: string;
  Company: Company;
  JobTypeId: number;
  JobType: JobType;
  TimeStamp: string; // ISO 8601 formatted date
  JobPosition: string;
  EndDateTime: string; // ISO 8601 formatted date
  JobDescription: string;
  Location: string;
  SalaryRange: string;
  WorkTimeType: string;
  JobVacancySkills: JobVacancySkill[];
  JobVacancyResponsibilities: JobVacancyResponsibility[];
  ExtrasInfos: ExtraInfo[];
}

export interface Application {
  jobVacancyId: string;
  studentId: string;
  status: string;
  notes: string;
  companyNote: string;
  createdAt: string; // ISO 8601 formatted date
  updatedAt: string; // ISO 8601 formatted date
}

function CompanyHomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [vacancies, setVacancies] = useState<
    JobVacancy[]
  >([]);
  const { toast } = useToast();

  useEffect(() => {
    async function getStudents() {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API + "student/getStudentByFilter", {

          },
          {
            headers: {
              Authorization: `Bearer ${decrypt(Cookies.get("token"))}`
            }
          }
        );
        console.log(response.data);
        
        setStudents(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
    }

    async function getLatestVacancy() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API +
            "jobVacancy/getByCompanyId/" +
            decrypt(Cookies.get("id")) +
            "/3"
        );
        console.log(response.data);
        
        setVacancies(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
    }

    AOS.init({ duration: 500 });
    getStudents();
    getLatestVacancy();
  }, []);

  return (
    <Layout>
      <div className="mx-[60px] overflow-hidden pb-14">
        <div
          className="bg-[#120272] p-[24px] mt-[30px] rounded-md"
          data-aos="fade-up"
        >
          <div className="text-white text-[32px]">Welcome Back Rico!!</div>
          <div className="text-white mt-[10px]">
            We're thrilled to have you back on our platform! As a valued company
            stakeholder, you have access to a talented pool of students eager to
            make their mark in the industry. Take advantage of our tools to find
            the right candidates and post your job openings. Together, let's
            build the future by connecting bright minds with the right
            opportunities.
          </div>
          <div className="mt-[30px] w-[30%]">
            <Input placeholder={"Let's find a job for you"} />
          </div>
        </div>

        <div data-aos="fade-up">
          <div className="text-[24px] font-medium my-10 text-center">
            Latest Vacancy
          </div>

          <div className="flex w-full gap-4">
            {vacancies.length < 1 ? (
              <div className="flex flex-col items-center w-full">
                <div className="my-2">There is no vacancy</div>
                <Link to="/company/new-vacancy">
                  <Button>+ Add Vacancy Here</Button>
                </Link>
              </div>
            ) : (
              vacancies.map((vacancy) => {
                console.log(vacancy);

                return (
                  <JobCard2
                    key={vacancy.id}
                    jobVacancy={vacancy}
                    jobApplyCount={vacancy.jobApplyCount}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mt-[40px]" data-aos="fade-up" data-aos-once="true">
          <div className="text-[24px] font-medium mb-4 text-center">
            Browse student may fit with your company
          </div>

          <div className="text-center mb-6">
            Explore students who align with your company. Our candidates are
            eager learners with a passion for innovation, equipped to tackle
            challenges and bring fresh perspectives. They demonstrate strong
            problem-solving abilities, adaptability, and a collaborative spirit,
            making them a perfect fit for dynamic and forward-thinking
            environments.
          </div>

          <div className="grid grid-cols-4 w-full justify-between px-[10vw] gap-10">
            {students.map((student: Student) => {
              return (
                <StudentCard
                  gpa={student.gpa}
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  nim={student.nim}
                  email={student.email}
                  phone={student.phone}
                  major={student.major}
                  address={student.address}
                  city={student.city}
                  state={student.state}
                  pictureUrl={student.pictureUrl}
                  description={student.description}
                  personalUrl={student.personalUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CompanyHomePage;
