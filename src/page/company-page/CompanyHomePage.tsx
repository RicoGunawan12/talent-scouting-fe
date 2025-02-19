import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Input } from "@/components/ui/input";
import JobCard2 from "../component/JobCard2";
import StudentCard from "../component/StudentCard";
import { StudentCardProps } from "../props/StudentCardProps";
import {
  CompanyVacancyWithApplyCountProps,
  VacancyResponse,
} from "../props/CompanyVacancyProps.ts";
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
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function getStudents() {
      try {
        const response = await axios.post(
          import.meta.env.VITE_API + "student/getStudentByFilter",
          {},
          {
            headers: {
              Authorization: `Bearer ${decrypt(Cookies.get("token"))}`,
            },
          }
        );
        

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
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 overflow-hidden pb-14">
        <div className="bg-[#120272] p-6 mt-6 rounded-md text-white" data-aos="fade-up">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome Back Rico!!</h1>
          <p className="mt-3 text-sm sm:text-base">
            We're thrilled to have you back on our platform! As a valued company stakeholder, you have access to a
            talented pool of students eager to make their mark in the industry.
          </p>
          <div className="mt-4 w-full sm:w-1/2 md:w-1/3">
            <Input placeholder={"Let's find a job for you"} />
          </div>
        </div>

        <div data-aos="fade-up" className="mt-10">
          <h2 className="text-center text-xl sm:text-2xl font-medium">Latest Vacancy</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {vacancies.length === 0 ? (
              <div className="col-span-full text-center">
                <p className="my-2">There is no vacancy</p>
                <Link to="/company/new-vacancy">
                  <Button>+ Add Vacancy Here</Button>
                </Link>
              </div>
            ) : (
              vacancies.map((vacancy) => (
                <JobCard2 key={vacancy.id} jobVacancy={vacancy} jobApplyCount={vacancy.jobApplyCount} />
              ))
            )}
          </div>
        </div>

        <div className="mt-10" data-aos="fade-up">
          <h2 className="text-center text-xl sm:text-2xl font-medium">Browse Students</h2>
          <p className="text-center text-sm sm:text-base mt-2">
            Explore students who align with your company. Our candidates are eager learners with a passion for
            innovation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {students.map((student) => (
              <StudentCard key={student.id} {...student} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CompanyHomePage;
