import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { decrypt } from "../util/Utility.tsx";
import { useNavigate } from "react-router-dom";
import { JobVacancy } from "./HomePage.tsx";

function JobDetailPage() {
  const nav = useNavigate();
  const { vacancyId } = useParams();
  const { toast } = useToast();
  const [vacancy, setVacancy] = useState<JobVacancy>();
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function getVacancyById() {
      try {
        const vacancyResponse = await axios.get(
          import.meta.env.VITE_API +
            "jobVacancy/" +
            vacancyId
        );

        console.log(vacancyResponse.data);
        setVacancy(vacancyResponse.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
    }
    getVacancyById();
  }, []);

  async function handleApply() {
    try {
      const body = {
        JobVacancyId: vacancyId,
        StudentID: decrypt(Cookies.get("id")),
        status: "Waiting",
        notes: notes,
      };

      const response = await axios.post(
        import.meta.env.VITE_API + "jobApply/",
        body
      );
      toast({
        variant: "default",
        title: "Apply Success!",
        description:
          "You have applied to " +
          vacancy?.company.name +
          " as a " +
          vacancy?.jobPosition +
          ". Let's wait for the company approve your request",
      });
      nav("/student/requests");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Inform admin immediately!",
      });
    }
  }

  return (
    <Layout>
      <div className="mt-6 pt-10 pb-20 mx-[20vw]">
        <div className="flex max-md:block">
          <div className="w-1/2 flex justify-center items-center rounded-md bg-[#F0F0F0] mr-12 ">
            <img
              src={vacancy?.company.logourl}
              className="h-[200px] object-cover object-center transition hover:scale-110"
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
            </div>

            <div className="flex mt-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="mr-4 transition hover:scale-105">
                    Fast Apply
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Apply for {vacancy?.jobPosition} at PT Bank Central Asia
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="my-6">
                        <div>Messages</div>
                        <div>
                          <textarea
                            onChange={(e) => setNotes(e.target.value)}
                            className="w-full border-2 rounded-md p-2 mt-2"
                          ></textarea>
                        </div>

                        <div className="text-[red] mt-2">
                          <div className="font-semibold">Notes:</div>
                          <div>
                            After you apply to this company your profile will be
                            seen by company. You can not update your message
                            after you apply
                          </div>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleApply}>
                      Apply Now
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Link to={"/company/" + vacancy?.companyId}>
                <Button className="transition hover:scale-105">
                  View Company
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-[24px] font-medium mb-4 font-semibold">
            Description
          </div>
          <div>{vacancy?.jobDescription}</div>
        </div>

        <div className="mt-10">
          <div className="text-[24px] font-medium mb-4 font-semibold">
            Requirements
          </div>

          <ul>
            {vacancy?.jobVacancyResponsibilities.map((responsibility) => {
              return (
                <li className="my-2">
                  - {responsibility.ResponsibilityDetail}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10">
          <div className="text-[24px] font-medium mb-4 font-semibold">
            Skills and Tools
          </div>

          <div>
            <Accordion type="multiple" className="text-lg">
              {vacancy?.jobVacancySkills.map((s, idx) => {
                return (
                  <AccordionItem value={idx.toString()}>
                    <AccordionTrigger>{s.Skill.SkillName}</AccordionTrigger>
                    <AccordionContent className="text-[15px]">
                      {s.SkillDetail}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>

        {
          vacancy?.extraInfos ?
          vacancy?.extraInfos.map((extras) => {
            return (
              <div className="mt-10">
                <div className="text-[24px] font-medium mb-4 font-semibold">
                  {extras.ExtrasTitle}
                </div>
  
                <div>{extras.ExtrasDescription}</div>
              </div>
            );
          })
          :
          ""

        }
      </div>
    </Layout>
  );
}

export default JobDetailPage;
