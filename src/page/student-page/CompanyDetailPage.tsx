import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import CompanyVacancy2 from "../component/CompanyVacancy2";
import Temp from "../../assets/logo_header.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CompanyCardProps } from "../props/CompanyCardProps";
import Spinner from "../component/Spinner";
import { useToast } from "@/components/hooks/use-toast";
import { CompanyVacancyWithApplyCountProps, VacancyResponse } from "../props/CompanyVacancyProps";

export interface Company {
  id: string;
  name: string;
  logourl: string;
  description: string;
  location: string;
  email: string;
}


function CompanyDetailPage() {
  const { companyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<Company>();
  const [vacancies, setVacancies] = useState<
    VacancyResponse[]
  >([]);
  const { toast } = useToast();

  useEffect(() => {
    async function getCompanyById() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "company/" + companyId
        );
        console.log(response.data);
        
        setCompany(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to get company data",
          description: "Inform admin immediately!",
        });
      }
    }

    async function getVacancyByCompanyId() {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "jobVacancy/getByCompanyId/" + companyId
        );
        console.log(response.data);
        
        setVacancies(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to get company vacancy data",
          description: "Inform admin immediately!",
        });
      }
      setLoading(false);
    }
    getVacancyByCompanyId();
    getCompanyById();
  }, []);

  return (
    <Layout>
      <div className="w-full px-20 py-10">
        <div className="flex justify-center rounded-xl bg-[#F0F0F0] shadow-md">
          <img
            src={company?.logourl}
            className="h-[400px] transition hover:scale-110"
          />
        </div>

        <div className="mt-6 py-6 px-16 rounded-xl shadow-md">
          <div>
            <div className="text-[28px] font-bold">{company?.name}</div>
            <div className="text-gray-600">{company?.location}</div>
          </div>

          <div className="mt-4">
            <p>{company?.description}</p>

            {/* <div className='max-w-[100vw]'>
                                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                                

                                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet 
                        </div> */}
          </div>

          <div className="mt-10">
            <div className="text-[28px] font-bold">
              Job Vacancy at PT Ford Jakarta
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <Spinner />
            ) : vacancies.length < 1 ? (
              <div className="text-center text-red-600">
                There is no vacancy in this company
              </div>
            ) : (
              vacancies.map((vacancy) => {
                return (
                  <CompanyVacancy2
                    // jobApplyCount={vacancy.jobApplyCount}
                    jobApplyCount={10}
                    jobVacancy={vacancy}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CompanyDetailPage;
