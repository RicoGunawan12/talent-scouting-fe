import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "aos/dist/aos.css";
import AOS from "aos";
import StudentCard from "../component/StudentCard";
import { StudentCardProps } from "../props/StudentCardProps";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxCustom } from "../component/CheckboxCustom";
import Spinner from "../component/Spinner";

export interface Student {
  id: string
  nim: string;
  name: string;
  phone: string;
  gpa: number;
  major: string;
  address: string;
  city: string;
  state: string;
  pictureUrl: string;
  description: string;
  personalUrl: string;
  email: string;
}

function BrowseStudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const [search, setSearch] = useState("");
  const [major, setMajor] = useState("-");
  const [position, setPosition] = useState("");

  useEffect(() => {
    async function getStudents() {
      setLoading(true);
      try {
        if (major === "-") {
          setMajor("");
        }
        const response = await axios.post(
          import.meta.env.VITE_API + "student/getStudentByFilter", {
            searchKeyword: search,
            major: major,
            position: position
          }
        );
        console.log(response.data);
        
        setStudents(response.data);
      } catch (error) {}
      setLoading(false);
    }

    getStudents();

    AOS.init({ duration: 500 });
  }, [update]);
  return (
    <Layout>
      <div className="mx-[12vw] mb-10 mt-6">
        <div className="flex flex-col items-center" data-aos="fade-up">
          <div className="text-center font-semibold text-[24px]">
            1000+ Best Bina Nusantara Students
          </div>

          <div className="mt-4">
            Meet over 1000 top graduates from Bina Nusantara University, known
            for their strong skills and academic excellence. These graduates are
            ready to bring fresh ideas and expertise to the workforce. Connect
            with the best talent and discover how they can contribute to your
            organization.
          </div>
        </div>
        <div className="flex mt-10 w-full relative">
          <div
            className="w-1/4 bg-[#F0F0F0] min-h-[60vh] rounded-sm p-4 sticky top-[15%]"
            data-aos="fade-up"
          >
            <div className="font-bold">Filters</div>

            <Input value={search} onChange={(e) => { setSearch(e.target.value); setUpdate(!update)  }} className="my-2" placeholder="Search Student" />

            <div>
              <Select onValueChange={(value) => { setMajor(value); setUpdate(!update) }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter Major" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="-">
                      All
                    </SelectItem>
                    <SelectItem value="Computer Science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="Mobile Application Development">
                      Mobile Application Development
                    </SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Cyber Security">
                      Cyber Security
                    </SelectItem>
                    <SelectItem value="Game Application Development">
                      Game Application Development
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="font-bold mt-10">Filter Strong Position</div>

            <div>
              <CheckboxCustom text={"Front End Developer"}  />
              <CheckboxCustom text={"Back End Developer"} />
              <CheckboxCustom text={"AI Engineer"} />
              <CheckboxCustom text={"Mobile Developer"} />
              <CheckboxCustom text={"Cyber Security"} />
              <CheckboxCustom text={"Data Analyst"} />
              <CheckboxCustom text={"Web Developer"} />
              <CheckboxCustom text={"Game Developer"} />
            </div>
          </div>

          <div className="w-3/4 ml-10" data-aos="fade-up">
            {loading ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-3 gap-10">
                {
                  students != null ? 
                    students.map((student: Student) => {
                      return (
                        <StudentCard
                          gpa={student?.gpa}
                          key={student?.id}
                          id={student?.id}
                          name={student?.name}
                          nim={student?.nim}
                          email={student?.email}
                          phone={student?.phone}
                          major={student?.major}
                          address={student?.address}
                          city={student?.city}
                          state={student?.state}
                          pictureUrl={student?.pictureUrl}
                          description={student?.description}
                          personalUrl={student?.personalUrl}
                        />
                      );
                    })
                    :
                    <div className="text-center text-[red]">There is no student</div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BrowseStudentPage;
