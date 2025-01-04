import React, { useState, useEffect } from "react";
import Temp from "./../../assets/logo_binus.png";
import { Button } from "@/components/ui/button";
import { StudentRequestProps } from "../props/RequestProps";
import { Link } from "react-router-dom";
import { useToast } from "@/components/hooks/use-toast";
import axios from "axios";
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

const ApplierRow: React.FC<
  StudentRequestProps & {
    handleUpdate: () => void;
  }
> = ({ job_vacancy, notes, status, student, handleUpdate }) => {
  const { toast } = useToast();
  const [approveNote, setApproveNote] = useState("");
  const [rejectNote, setRejectNote] = useState("");

  async function handleApprove() {
    try {
      
      const body = {
        jobVacancyId: job_vacancy.id,
        studentId: student.id,
        status: "Approved to Interview",
        companyNote: approveNote,
        notes: notes,
      };
      await axios.post(import.meta.env.VITE_API + "jobApply/updateJobApply", body);
      handleUpdate();
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Inform admin immediately!",
      });
    }
  }

  async function handleReject() {
    try {
      const body = {
        jobVacancyId: job_vacancy.id,
        studentId: student.id,
        status: "Rejected",
        companyNote: rejectNote,
        notes: notes,
      };
      await axios.post(import.meta.env.VITE_API + "jobApply/updateJobApply", body);
      handleUpdate();
    } catch (error) {
      console.log(error);
      
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Inform admin immediately!",
      });
    }
  }

  return (
    <div className="flex justify-between items-center border-b-2  py-8">
      <Link
        to={"/student-profile/" + student.id}
        className="flex items-center pl-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <div className="mr-8">
          <img
            src={student.pictureUrl}
            className="rounded-[50%] border-2 w-[125px] h-[125px] object-cover object-center"
          />
        </div>

        <div>
          <div className="text-[24px] font-semibold">{student.name}</div>
          <div>{student.major}</div>
          <div className="my-4 pr-4">{notes}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Back End Developer
            </span>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              Back End Developer
            </span>
          </div>
        </div>
      </Link>

      <div>
        {status == "Waiting" ? (
          <div>
            <div className="my-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-[#28A745] w-[150px] hover:bg-[darkgreen]">
                    Approve to Interview
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Approve {student.name} to {job_vacancy?.company.name} as a{" "}
                      {job_vacancy?.jobPosition} to interview?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="my-6">
                        <div>Messages</div>
                        <div>
                          <textarea
                            onChange={(e) => setApproveNote(e.target.value)}
                            className="w-full border-2 rounded-md p-2 mt-2"
                          ></textarea>
                        </div>

                        <div className="text-[red] mt-2">
                          <div className="font-semibold">Notes:</div>
                          <div>
                            This notes will be sent to student by this
                            application and email
                          </div>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleApprove}
                      className="bg-[#28A745]"
                    >
                      Approve to Interview
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className="my-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-[#DC3545] w-[150px] hover:bg-[darkred]">
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                      Reject {student.name} to {job_vacancy?.company.name} as a{" "}
                      {job_vacancy?.jobPosition} to interview?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <div className="my-6">
                        <div>Messages</div>
                        <div>
                          <textarea
                            onChange={(e) => setRejectNote(e.target.value)}
                            className="w-full border-2 rounded-md p-2 mt-2"
                          ></textarea>
                        </div>

                        <div className="text-[red] mt-2">
                          <div className="font-semibold">Notes:</div>
                          <div>
                            This notes will be sent to student by this
                            application and email
                          </div>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-[#DC3545]"
                      onClick={handleReject}
                    >
                      Reject
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : status == "Waiting" ? (
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            Waiting
          </span>
        ) : status == "Approved to Interview" ? (
          <span className="text-center inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
            Approved to Interview
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-700/10">
            Rejected
          </span>
        )}
      </div>
    </div>
  );
};

export default ApplierRow;
