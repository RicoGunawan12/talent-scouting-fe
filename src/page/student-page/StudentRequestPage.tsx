import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import AppliedRequest from "../component/AppliedRequest";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
import Cookies from "js-cookie";
import { decrypt } from "../util/Utility.tsx";
import Spinner from "../component/Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import Aos from "aos";
import { JobVacancy } from "./HomePage.tsx";
import { ReachOutResponse } from "../company-page/CompanyReachoutPage.tsx";
import AppliedRequestStudent from "../component/CompanyRequestStudent.tsx";

export interface Application {
  jobVacancyId: string;
  studentId: string;
  status: string;
  notes: string;
  student: {
    id: string;
    gpa: number;
    name: string
    pictureUrl: string
    major: string
};
  companyNote: string;
  createdAt: string; // ISO 8601 formatted date
  updatedAt: string; // ISO 8601 formatted date
  job_vacancy: JobVacancy;
}


function StudentRequestPage() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<Application[]>([]);
  const [reach, setReach] = useState<ReachOutResponse[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    async function getRequestByStudentId() {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "jobApply/byStudentId/" + decrypt(Cookies.get("id"))
        );
        console.log(response.data);
        
        setRequests(response.data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
      setLoading(false);
    }

    async function getReachByStudentId() {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "reachOut/byStudentId/" + decrypt(Cookies.get("id"))
        );
        console.log(response.data);
        
        setReach(response.data)
        
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
      setLoading(false);
    }
    getReachByStudentId()
    getRequestByStudentId();
    Aos.init({ duration: 500 });
  }, []);
  return (
    <Layout>
      <div data-aos="fade-up" data-aos-once="true" className="mt-10 mx-[10vw]">
        <div className="flex gap-10 border-b-[1px] border-black">
          <div
            style={active ? {} : { backgroundColor: "black", color: "white" }}
            className="p-2 rounded-t-xl transition hover:bg-[black] font-semibold hover:text-white cursor-pointer"
            onClick={() => setActive(!active)}
          >
            Applied Vacancy
          </div>
          <div
            style={active ? { backgroundColor: "black", color: "white" } : {}}
            className="p-2 rounded-t-xl transition font-semibold hover:bg-[black] hover:text-white cursor-pointer"
            onClick={() => setActive(!active)}
          >
            Company Request
          </div>
        </div>

        <div>
          {active ? (
            <div>
              {
                reach.map((r) => {
                  return <AppliedRequestStudent 
                    description={r.company.description} 
                    email={r.company.email} 
                    id={r.company.id} 
                    location={r.company.location} 
                    logoUrl={r.company.logoUrl} 
                    name={r.company.name} 
                    key={r.company.id}
                    message={r.message}
                  />
                })
              }
            </div>
          ) : (
            <div>
              {loading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : requests === null ? (
                <div className="text-center text-red-600 mt-10">
                  You have no request
                </div>
              ) : (
                requests.map((req, idx) => {
                  console.log(req);

                  return (
                    <AlertDialog key={idx}>
                      <AlertDialogTrigger asChild>
                        <AppliedRequest
                          job_vacancy={req.job_vacancy}
                          notes={req.notes}
                          status={req.status}
                          student={req.student}
                          companyNote={req.companyNote}
                        />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          {/* <AlertDialogTitle className="text-center">
                            Request {req.jobVacancy.jobPosition} at{" "}
                            {req.jobVacancy.company.name}
                          </AlertDialogTitle> */}
                          <AlertDialogDescription>
                            <div className="my-6 text-[black]">
                              <div className="mb-4">
                                Status:{" "}
                                {req.status === "Waiting" ? (
                                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    Waiting
                                  </span>
                                ) : req.status === "Approved to Interview" ? (
                                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                                    Approved to Interview
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
                                    Rejected
                                  </span>
                                )}
                              </div>
                              <div className="font-semibold">Your notes:</div>
                              <div className="mt-2">{req.notes}</div>

                              <div className="mt-6 font-semibold">
                                Company Notes:{" "}
                              </div>
                              
                                {req.status === "Waiting"
                                  ? <div className="mt-2 text-red-400">Wait for company</div>
                                  : req.companyNote === ""
                                  ? <div className="mt-2">There is no notes from company</div>
                                  : <div className="mt-2">{req.companyNote}</div>}
                            </div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <Link to={"/job-detail/" + req.jobVacancyId}>
                            <AlertDialogAction>
                              See Job Detail
                            </AlertDialogAction>
                          </Link>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default StudentRequestPage;
