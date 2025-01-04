import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import ApplierRow from "../component/ApplierRow";
import Image from "../../assets/logo_binus.png";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StudentRequestProps } from "../props/RequestProps";
import Spinner from "../component/Spinner";
import { useToast } from "@/components/hooks/use-toast";
import { VacancyDetailResponse } from "../props/CompanyVacancyProps";
import { JobVacancy } from "../student-page/HomePage";

function VacancyApplierPage() {
  const { toast } = useToast();
  const { vacancyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [applier, setApplier] = useState<StudentRequestProps[]>([]);
  const [vacancy, setVacancy] = useState<JobVacancy>();
  const [update, setUpdate] = useState(false);

  function handleUpdate() {
    setUpdate(!update);
  }

  useEffect(() => {
    async function getVacancyApplierById() {
      setLoading(true);
      try {
        const vacancy = await axios.get(
          import.meta.env.VITE_API +
            "jobApply/byVacancyId/" +
            vacancyId
        );
        console.log(vacancy.data);
        
        setApplier(vacancy.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
      setLoading(false);
    }

    async function getVacancyById() {
      try {
        const vacancy = await axios.get(
          import.meta.env.VITE_API +
            "jobVacancy/" +
            vacancyId
        );
        console.log(vacancy.data);
        
        setVacancy(vacancy.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
    }

    getVacancyApplierById();
    getVacancyById();
  }, [update]);

  return (
    <Layout>
      <div className="mt-6 pt-10 pb-20 mx-[20vw]">
        <div className="flex max-md:block">
          <div className="w-1/2 flex justify-center items-center rounded-md p-4 bg-[#F0F0F0] mr-12 ">
            <img
              src={vacancy?.company.logourl}
              className="h-[200px] transition hover:scale-110"
            />
          </div>
          <div className="w-1/2 max-sm:w-full">
            <div>
              <div className="text-[red] font-semibold">
                {vacancy?.endDateTime
                  ? Math.ceil(
                      (new Date(vacancy?.endDateTime).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  : ""}{" "}
                Days Left
              </div>
              <div className="font-bold text-[32px]">
                {vacancy?.jobPosition}
              </div>
              <div className="font-bold text-[24px]">
                {vacancy?.company.name}
              </div>
            </div>

            <div className="mt-2 font-medium">
              <div>{vacancy?.location}</div>
              <div>{vacancy?.jobType.JobTypeName}</div>
              <div>{vacancy?.workTimeType}</div>
              <div>{vacancy?.salaryRange}</div>
              {/* <div className="mt-2">
                <Button>Student Preview</Button>
              </div> */}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="text-[24px] mb-2 text-center">Job Applier</div>
          <div className="text-center mb-4">
            You need to approve or reject all of applier before{" "}
            <b>
              {vacancy?.endDateTime
                ? new Date(vacancy?.endDateTime).toDateString()
                : ""}
            </b>
          </div>

          <div>
            {applier === null ? (
              <div className="text-red-500 text-center mt-10">
                There is no applier right now
              </div>
            ) : loading ? (
              <Spinner />
            ) : (
              applier.map((app, idx) => {
                console.log(app);

                return (
                  <ApplierRow
                    job_vacancy={app.job_vacancy}
                    notes={app.notes}
                    status={app.status}
                    student={app.student}
                    // jobApplyPK={app.jobApplyPK}
                    key={idx}
                    companyNote={app.companyNote}
                    handleUpdate={handleUpdate}
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

export default VacancyApplierPage;
