import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout.tsx";
import AppliedRequest from "../component/AppliedRequest.tsx";
import CompanyRequest from "../component/CompanyRequest.tsx";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
import Cookies from "js-cookie";
import { decrypt } from "../util/Utility.tsx";
import Spinner from "../component/Spinner.tsx";
import { StudentRequestProps } from "../props/RequestProps.ts";
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
import { Link } from "react-router-dom";
import Aos from "aos";

export interface Student {
  id: string;
  name: string;
  gpa: number;
  pictureUrl: string;
  major: string;
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  location: string;
  email: string;
}

export interface ReachOutResponse {
  companyId: string;
  studentId: string;
  student: Student;
  company: Company;
  message: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}


function CompanyReachoutPage() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reach, setReach] = useState<ReachOutResponse[]>([]);
  const { toast } = useToast();
  useEffect(() => {
    async function getRequestByStudentId() {
      setLoading(true);
      try {
        const response = await axios.get(
          import.meta.env.VITE_API + "reachOut/byCompanyId/" + decrypt(Cookies.get("id"))
        );
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
    getRequestByStudentId();
    Aos.init({ duration: 500 });
  }, []);
  return (
    <Layout>
      <div data-aos="fade-up" data-aos-once="true" className="mt-10 mx-[10vw]">
        <div className="flex gap-10 border-b-[1px] border-black">
          <div
            style={{ backgroundColor: "black", color: "white" }}
            className="p-2 rounded-t-xl transition font-semibold hover:bg-[black] hover:text-white cursor-pointer"
          >
            Company Request
          </div>
        </div>

        <div>
          <div>
            {
              reach.map((r: ReachOutResponse) => {
                return <CompanyRequest message={r.message} name={r.student.name} gpa={r.student.gpa} id={r.student.id} major={r.student.major} pictureUrl={r.student.pictureUrl} key={r.student.id} />
              })
            }
            {/* <CompanyRequest name= />
            <CompanyRequest /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CompanyReachoutPage;
