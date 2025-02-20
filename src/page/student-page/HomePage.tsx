import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Input } from "@/components/ui/input";
import JobCard from "../component/JobCard";
import JobRecommendationCard from "../component/JobRecommendationCard";
import CompanyCard from "../component/CompanyCard";
import "aos/dist/aos.css";
import AOS from "aos";
import Marquee from "react-fast-marquee";
import { CompanyCardProps } from "../props/CompanyCardProps";
// import { CompanyVacancyWithApplyCountProps, VacancyResponse } from "../props/CompanyVacancyProps";
import axios from "axios";
import Spinner from "../component/Spinner";
import { useToast } from "@/components/hooks/use-toast";
import { decrypt } from "../util/Utility";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

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

export interface JobVacancy {
  id: string;
  companyId: string;
  company: Company;
  jobTypeId: number;
  jobType: JobType;
  timeStamp: string; // ISO 8601 formatted date
  jobPosition: string;
  endDateTime: string; // ISO 8601 formatted date
  jobDescription: string;
  location: string;
  salaryRange: string;
  workTimeType: string;
  jobVacancySkills: JobVacancySkill[];
  jobVacancyResponsibilities: JobVacancyResponsibility[];
  extraInfos: ExtraInfo[];
  jobApplyCount: number;
}

export interface Company {
  id: string;
  name: string;
  logourl: string;
  description: string;
  location: string;
  email: string;
}

const HomePage: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyCardProps[]>([]);
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<
    { name: string; position: { id: string; name: string } }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    async function getRecommendation() {
      setLoading(true);
      try {
        const recommendation = await axios.get(
          // `https://job-fit-cv/api/user/2502017572/recommended-company`
          `https://job-fit-cv.shirloin.my.id/api/user/2502017572/recommended-company`
        );
        setRecommendation(recommendation?.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getRecommendation();
  }, []);

  useEffect(() => {
    async function getAllCompany() {
      setCompanyLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "company/",
          {
            headers: {
              Authorization: `Bearer ${decrypt(Cookies.get("token"))}`,
            },
          }
        );

        setCompanies(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: "Inform admin immediately",
        });
      }
      setCompanyLoading(false);
    }

    async function getAllJob() {
      try {
        const body = {
          location: "",
          workTimeType: "",
          jobTypeId: "",
          searchKeyword: "",
        };
        const response = await axios.get(
          import.meta.env.VITE_API + "jobVacancy/",
          {
            headers: {
              Authorization: `Bearer ${decrypt(Cookies.get("token"))}`,
            },
          }
        );

        setVacancies(response.data);
      } catch (error) {}
    }

    AOS.init({ duration: 500 });
    getAllCompany();
    getAllJob();
  }, []);

  return (
    <Layout>
      <div className="mx-[60px]">
        <div
          className="bg-[#120272] text-white p-[24px] mt-[30px] rounded-lg"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <div className="text-[32px]">
            Welcome Back {decrypt(Cookies.get("name"))}!!
          </div>
          <div className="mt-[10px]">
            We're excited to help you find your next opportunity! Start your job
            search today by browsing our latest vacancies or updating your
            profile to attract the best employers. Whether you're looking to
            advance your career or explore new paths, we're here to support you
            every step of the way.
          </div>
          <div className="mt-[30px] w-[30%]">
            <Link to="/browse-job">
              <Input
                placeholder={"Let's find a job for you"}
                className="text-black"
              />
            </Link>
          </div>
        </div>

        <div className="my-[50px]" data-aos="fade-up" data-aos-once="true">
          <div className="text-[24px] font-medium mb-2 text-center">
            Job Recommendation
          </div>

          <div className="mt-4 mb-8">
            Based on your profile and recent activity, we've handpicked some
            exciting job opportunities that match your skills and career goals.
            Explore these tailored recommendations and take the next step
            towards your dream job. Keep your profile updated to receive more
            accurate suggestions!
          </div>

          <div className="flex justify-between max-md:flex-wrap max-md:justify-center mt-6 gap-6">
            {/* <JobRecommendationCard JobName={"Front End Developer"} Index={1} />
            <JobRecommendationCard JobName={"Back End Developer"} Index={2} />
            <JobRecommendationCard JobName={"AI Engineer"} Index={3} />
            <JobRecommendationCard JobName={"Full Stack Developer"} Index={4} /> */}
            {loading ? (
              <div className="w-full flex justify-center my-4">
                <Spinner />
              </div>
            ) : (
              recommendation.map(
                (
                  rec: {
                    name: string;
                    position: { id: string; name: string };
                  },
                  index
                ) => {
                  if (index <= 3) {
                    return (
                      <JobRecommendationCard
                        JobName={rec.position.name}
                        Index={index}
                      />
                    );
                  } else return;
                }
              )
            )}
          </div>
        </div>

        <div
          className="mb-[100px] mt-20"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <Marquee speed={30}>
            <img
              src={"https://logodix.com/logo/81176.jpg"}
              className="h-[150px] mx-4"
            />
            <img
              src={
                "https://logodownload.org/wp-content/uploads/2014/09/nvidia-logo-0.png"
              }
              className="h-[150px] mx-4"
            />
            <img
              src={
                "https://avatars.githubusercontent.com/u/29785210?s=200&v=4"
              }
              className="h-[150px] mx-4"
            />
            <img
              src={
                "https://the-iconomics.storage.googleapis.com/wp-content/uploads/2020/03/18140740/d5daeeaca986fb2655a4965884c0d6ea-905x613.png"
              }
              className="h-[150px] mx-4"
            />
            <img
              src={"https://logodix.com/logo/81176.jpg"}
              className="h-[150px] mx-4"
            />
            <img
              src={
                "https://th.bing.com/th/id/R.ff70d9d943a71067cb9e0f061c078fd0?rik=YDbEo%2fzsssVmPA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-HL8IH_ZHKvI%2fUl-kk_7AC_I%2fAAAAAAAAC6M%2fb7BWRYGdn8w%2fs1600%2fBCA-Bank-Logo-blue.png&ehk=7%2fTz85jERnSu1EVuPQi4qCQHtzNt%2bxTv%2fZiS0x4waYM%3d&risl=&pid=ImgRaw&r=0"
              }
              className="h-[150px] mx-4"
            />
            <img
              src={
                "https://th.bing.com/th/id/OIP.RRw-YfTv2j2FRFQBg94ULgHaCc?rs=1&pid=ImgDetMain"
              }
              className="h-[150px] mx-4"
            />
            <img
              src={
                "https://th.bing.com/th/id/OIP.uOQhqcKqDGKuaOjRK7L03gAAAA?rs=1&pid=ImgDetMain"
              }
              className="h-[150px] mx-4"
            />
          </Marquee>
        </div>

        <div className="my-[50px]" data-aos="fade-up" data-aos-once="true">
          <div className="text-[24px] font-medium mb-2 text-center">
            Popular Job
          </div>
          <div>
            These positions are trending among job seekers for their competitive
            salaries, growth opportunities, and dynamic work environments.
            Whether you're looking to advance your career or find a role that
            matches your passion, these popular jobs are in high demand. Don't
            miss your chance to apply!
          </div>

          {vacancies == null ? (
            <div className="text-center my-[100px]">
              There is no vacancy. Stay tune
            </div>
          ) : (
            <div className="flex justify-center flex-wrap mt-6 gap-10">
              {vacancies.map((vacancy, idx) => {
                return idx > 4 ? (
                  ""
                ) : (
                  <JobCard
                    Id={vacancy.id}
                    JobName={vacancy.jobPosition}
                    // CompanyName={vacancy.Company.Name}
                    // Image={vacancy.Company.LogoUrl}
                    CompanyName={vacancy.company.name}
                    Image={vacancy.company.logourl}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="my-[70px]" data-aos="fade-up" data-aos-once="true">
          <div className="text-[24px] font-medium mb-2 text-center">
            Top Companies for Software Developers
          </div>
          <div>
            These companies are known for their exciting projects, advanced
            technologies, and great work environments. If you're looking to grow
            your career as a software developer, these are the places to be.
            Check out the opportunities they offer!
          </div>

          {companyLoading ? (
            <div className="flex justify-center mt-10">
              <Spinner />
            </div>
          ) : companies.length === 0 ? (
            <div className="text-center my-[100px]">
              There is no company. Stay tune
            </div>
          ) : (
            <div className="flex flex-wrap mt-6 gap-10 justify-center">
              {companies.map((company: CompanyCardProps, idx: number) => {
                return (
                  <CompanyCard
                    Id={company.Id}
                    Name={company.Name}
                    LogoUrl={company.LogoUrl}
                    Location={company.Location}
                    VacancyCount={10}
                    Description={company.Description}
                    key={idx}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
