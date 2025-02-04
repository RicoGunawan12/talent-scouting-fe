import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout.tsx";
import Image from "../../assets/Student.jpg";
import JobRecommendationCard from "../component/JobRecommendationCard.tsx";
import CVTemplate from "../component/CVTemplate.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { StudentCardProps } from "../props/StudentCardProps.ts";
import axios from "axios";
import Cookies from "js-cookie";
import { capitalizeName, decrypt } from "../util/Utility.tsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import Portofolio from "../../assets/portofolio.png";

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
import { toast } from "@/components/hooks/use-toast.ts";
import { Input } from "@/components/ui/input.tsx";
import Spinner from "../component/Spinner.tsx";

function CompanyStudentProfilePage() {
  const nav = useNavigate();
  const { studentId } = useParams();
  const [student, setStudent] = useState<StudentCardProps>();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{ name: string, position: { id: string, name: string } }[]>([]);
  const [cv, setCv] = useState<any>()

  useEffect(() => {
    async function getStudentById() {
      setLoading(true);
      var nim = "";
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "student/" + studentId
        );
        console.log(response.data);
        nim = response.data.nim;

        setStudent(response.data);
      } catch (error) {
        console.log(error);
      }
      try {
        // const cv = await axios.get(`https://job-fit-cv/api/user//cv`);
        const cvResponse = await axios.get(
          `https://job-fit-cv.shirloin.my.id/api/user/2502017572/cv`
        );
        console.log(cvResponse);
        setCv(cvResponse?.data.cv);
      } catch (error) {}
      
      try {
        const recommendation = await axios.get(
          // `https://job-fit-cv/api/user/2502017572/recommended-company`
          `https://job-fit-cv.shirloin.my.id/api/user/2502017572/recommended-company`
        );
        setRecommendation(recommendation?.data);
        console.log(recommendation);
      } catch (error) {}
      setLoading(false);
    }

    getStudentById();
  }, []);

  const handleReach = async () => {
    try {
      const body = {
        CompanyId: decrypt(Cookies.get("id")),
        StudentId: studentId,
        Message: notes,
      };
      console.log(body);

      const response = await axios.post(
        import.meta.env.VITE_API + "reachOut/addNewReachOut",
        body
      );
      toast({
        variant: "default",
        title: "Message sent!",
        description: "Wait for reply in your email!",
      });
      nav("/company/home");
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Inform admin immediately!",
      });
    }
  };

  return (
    <Layout>
      <div className="mx-[20vw] pt-10 flex justify-center pb-20">
        <div>
          <div className="flex items-center justify-center">
            <div className="rounded-[50%] w-[40%] h-[200px] flex justify-end">
              <img
                src={student?.pictureUrl}
                className="w-[200px] h-[200px] border-[1px] object-cover object-center rounded-[50%]"
              />
            </div>
            <div className="ml-16 w-[60%]">
              <div className="text-[2.5rem] font-semibold">
                {student
                  ? student.name
                  : capitalizeName(decrypt(Cookies.get("name")))}
              </div>
              <div className="text-[1.2rem]">{student?.nim}</div>
              <div className="text-[1.2rem]">{student?.major}</div>
              <div className="text-[1.2rem]">GPA: {student?.gpa}</div>
              <div className="text-[1.2rem]">{student?.email}</div>
              <div className="mt-2 flex gap-2">
                <Link
                  to={student?.personalUrl || ""}
                  className="flex items-center bg-blue-200 px-2 rounded-xl"
                  target="_blank"
                >
                  <div>
                    <img src={Portofolio} width={20} className="mr-2" />
                  </div>
                  <div>Portofolio Website</div>
                </Link>
                {/* <Link to={student?.personalUrl || ""} target="_blank">
                  <img
                    className="h-[30px] rounded-[50%]"
                    src={
                      "https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png"
                    }
                  />
                </Link> */}
              </div>

              {decrypt(Cookies.get("is_microsoft")) === "true" ? (
                <div className="mt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="mr-4 transition hover:scale-105">
                        Update Personal Link
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                          Update Personal Link
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className="my-6">
                            <div>Personal Link</div>
                            <div className="mt-2">
                              <Input
                                type="text"
                                placeholder="https://john.doe"
                              />
                            </div>

                            <div className="text-[red] mt-2">
                              {/* <div className="font-semibold">Notes:</div>
                              <div>
                                After you apply to this company your profile will be
                                seen by company. You can not update your message
                                after you apply
                              </div> */}
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleReach}>
                          Update
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ) : (
                <div className="mt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="mr-4 transition hover:scale-105">
                        Reach Out
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">
                          Reach {student?.name} to your company!
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
                                After you apply to this company your profile
                                will be seen by company. You can not update your
                                message after you apply
                              </div>
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleReach}>
                          Reach Out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="text-[24px] font-medium mb-8 font-semibold">
              Job Recommendation
            </div>
            <div className="flex justify-between mt-6 gap-4">
              {
                loading ?
                "" : 
                recommendation.map((rec: { name: string, position: { id: string, name: string }}, index) => {
                  if (index <= 3) {
                    return <JobRecommendationCard
                      JobName={rec.position.name}
                      Index={index}
                    />
                  } 
                  else return
                })
              }
              
              {/* <JobRecommendationCard JobName={"Back End Developer"} Index={2} />
              <JobRecommendationCard JobName={"AI Engineer"} Index={3} />
              <JobRecommendationCard
                JobName={"Full Stack Developer"}
                Index={4}
              /> */}
            </div>
          </div>

            

            {
              loading ?
              <Spinner/>
              :
              cv ?
              <div className="mt-10 w-full flex gap-10">
                <div>
                  <div className="text-[24px] font-medium mb-2 font-semibold text-center sticky top-10">
                    Curriculum Vitae
                  </div>
                  <div className="flex mt-6 w-full gap-10 sticky top-[100px]">
                    <CVTemplate />
                  </div>
                </div>

                <div className="w-full">
                  <div className="text-[24px] font-medium mb-4 font-semibold">
                    Educations
                  </div>

                  {
                    cv?.educations.map((edu: any) => {
                      return <div className="mb-4">
                        <div className="text-[18px] font-semibold mb-2">
                          { edu?.degree } {" "} { edu?.schoolName } { " (" } {edu?.startDate} { " - "} { edu?.endDate } { ")"}
                        </div>
                        <div>
                          Field of study: { edu?.fieldOfStudy }
                        </div>
                      </div>
                    })
                  }

                  <div className="mt-10 w-full">
                    <div className="text-[24px] font-medium mb-4 font-semibold">
                      Experiences
                    </div>

                    {
                      cv?.experiences.map((exp: any) => {
                        return <div className="mb-4">
                          <div className="text-[18px] font-semibold mb-2">
                            { exp?.companyName } { " - " } { exp?.positionTitle } { " (" } {exp?.startDate} { " - "} { exp?.endDate } { ")"}
                          </div>
                          <div>
                            { exp?.summary }
                          </div>
                        </div>
                      })
                    }
                  </div>


                  <div className="mt-10 w-full">
                    <div className="text-[24px] font-medium mb-4 font-semibold">
                      Projects
                    </div>

                    {
                      cv?.projects.map((proj: any) => {
                        return <div className="mb-4">
                          <div className="text-[18px] font-semibold mb-2">
                            { proj?.projectName }
                          </div>
                          <div>
                            { proj?.projectDescription }
                          </div>
                        </div>
                      })
                    }
                  </div>

                  <div className="mt-10 w-full">
                    <div className="text-[24px] font-medium mb-4 font-semibold">
                      Skills
                    </div>
                    <li>
                      {
                        cv?.skills.map((skill: any) => {
                            return <ul className="text-[18px] font-semibold mb-2">
                              { skill?.name }
                            </ul>
                        })
                      }
                    </li>
                  </div>
                </div>
              </div>
              :
              <div className="text-center">
                There is no experience or the student not fill the CV yet
              </div>
            }
        </div>
      </div>
    </Layout>
  );
}

export default CompanyStudentProfilePage;
