import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import CompanyVacancy from "../component/CompanyVacancy";
import "aos/dist/aos.css";
import AOS from "aos";
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
import { CompanyVacancyWithApplyCountProps } from "../props/CompanyVacancyProps";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import Spinner from "../component/Spinner";
import { useToast } from "@/components/hooks/use-toast";
import { JobVacancy } from "./HomePage";

function BrowseJobPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [vacancies, setVacancies] = useState<JobVacancy[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [startSalary, setStartSalary] = useState(0);
  const [endSalary, setEndSalary] = useState(0);
  const [jobType, setJobType] = useState("");
  const [workTimeType, setWorkTimeType] = useState("");

  useEffect(() => {
    AOS.init({ duration: 500 });

    async function getVacancies() {
      setLoading(true);
      try {
        const body = {
          Location: location,
          workTimeType: workTimeType,
          JobTypeId: jobType,
          SearchKeyword: search,
        };

        const response = await axios.post(
          import.meta.env.VITE_API + "jobVacancy/getJobVacancyByFilter",
          body
        );

        setVacancies(response.data);
        setLoading(false);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
    }
    getVacancies();
  }, [search, location, workTimeType, jobType]);

  return (
    <Layout>
      <div className="mx-[8vw] mb-10 mt-6">
        <div className="flex flex-col items-center" data-aos="fade-up">
          <div className="text-center font-semibold text-[24px]">
            1000+ Software Engineer Jobs Vacancy
          </div>

          <div className="mt-4">
            Discover over 1000 job openings for software engineers. Whether
            you're an experienced professional or just starting out, there's a
            role that fits your skills and career goals. Start your search now
            and find the perfect job to advance your career in software
            engineering.
          </div>
        </div>

        <div className="flex mt-10 w-full relative">
          <div className="w-1/4 bg-[#F0F0F0] h-full rounded-sm p-4 sticky top-[15%] max-md:hidden">
            <div className="font-bold">Filters</div>

            <Input
              className="my-2"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Job"
            />

            <div>
              <Select
                onValueChange={(loc) => {
                  loc == "All" ? setLocation("") : setLocation(loc);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Aceh">Aceh</SelectItem>
                    <SelectItem value="Sumatera Utara">
                      Sumatera Utara
                    </SelectItem>
                    <SelectItem value="Sumatera Barat">
                      Sumatera Barat
                    </SelectItem>
                    <SelectItem value="Riau">Riau</SelectItem>
                    <SelectItem value="Kepulauan Riau">
                      Kepulauan Riau
                    </SelectItem>
                    <SelectItem value="Jambi">Jambi</SelectItem>
                    <SelectItem value="Sumatera Selatan">
                      Sumatera Selatan
                    </SelectItem>
                    <SelectItem value="Bangka Belitung">
                      Bangka Belitung
                    </SelectItem>
                    <SelectItem value="Bengkulu">Bengkulu</SelectItem>
                    <SelectItem value="Lampung">Lampung</SelectItem>
                    <SelectItem value="Jakarta">Jakarta</SelectItem>
                    <SelectItem value="Banten">Banten</SelectItem>
                    <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                    <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                    <SelectItem value="DI Yogyakarta">DI Yogyakarta</SelectItem>
                    <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                    <SelectItem value="Bali">Bali</SelectItem>
                    <SelectItem value="Nusa Tenggara Barat">
                      Nusa Tenggara Barat
                    </SelectItem>
                    <SelectItem value="Nusa Tenggara Timur">
                      Nusa Tenggara Timur
                    </SelectItem>
                    <SelectItem value="Kalimantan Barat">
                      Kalimantan Barat
                    </SelectItem>
                    <SelectItem value="Kalimantan Tengah">
                      Kalimantan Tengah
                    </SelectItem>
                    <SelectItem value="Kalimantan Selatan">
                      Kalimantan Selatan
                    </SelectItem>
                    <SelectItem value="Kalimantan Timur">
                      Kalimantan Timur
                    </SelectItem>
                    <SelectItem value="Kalimantan Utara">
                      Kalimantan Utara
                    </SelectItem>
                    <SelectItem value="Sulawesi Utara">
                      Sulawesi Utara
                    </SelectItem>
                    <SelectItem value="Gorontalo">Gorontalo</SelectItem>
                    <SelectItem value="Sulawesi Tengah">
                      Sulawesi Tengah
                    </SelectItem>
                    <SelectItem value="Sulawesi Barat">
                      Sulawesi Barat
                    </SelectItem>
                    <SelectItem value="Sulawesi Selatan">
                      Sulawesi Selatan
                    </SelectItem>
                    <SelectItem value="Sulawesi Tenggara">
                      Sulawesi Tenggara
                    </SelectItem>
                    <SelectItem value="Maluku">Maluku</SelectItem>
                    <SelectItem value="Maluku Utara">Maluku Utara</SelectItem>
                    <SelectItem value="Papua">Papua</SelectItem>
                    <SelectItem value="Papua Barat">Papua Barat</SelectItem>
                    <SelectItem value="Papua Tengah">Papua Tengah</SelectItem>
                    <SelectItem value="Papua Pegunungan">
                      Papua Pegunungan
                    </SelectItem>
                    <SelectItem value="Papua Selatan">Papua Selatan</SelectItem>
                    <SelectItem value="Papua Barat Daya">
                      Papua Barat Daya
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="font-bold mt-4">Salary Range (IDR)</div>

            <div className="flex items-center">
              <div className="mr-2">
                <Input className="my-2" placeholder="0" />
              </div>
              <div>
                <b>–</b>
              </div>
              <div className="ml-2">
                <Input className="my-2" placeholder="100000" />
              </div>
            </div> */}

            <div className="font-bold mt-4">Job Type</div>

            <div className="mt-2">
              <RadioGroup
                onValueChange={(jobType) => setJobType(jobType)}
                className="text-[14px]"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r2" />
                  <label htmlFor="r2">WFO (work from office)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r1" />
                  <label htmlFor="r1">WFH (work from home)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="r3" />
                  <label htmlFor="r3">Hybrid</label>
                </div>
              </RadioGroup>
            </div>

            <div className="font-bold mt-6">Work Time Type</div>

            <div className="mt-2">
              <RadioGroup
                onValueChange={(wtt) => setWorkTimeType(wtt)}
                className="text-[14px]"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Full Time" id="fulltime" />
                  <label htmlFor="fulltime">Full Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Part Time" id="parttime" />
                  <label htmlFor="parttime">Part Time</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Internship" id="intern" />
                  <label htmlFor="intern">Internship</label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="w-3/4 ml-10" data-aos="fade-left">
            <div>
              {loading ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : vacancies === null ? (
                <div className="text-center">There is no vacancy</div>
              ) : (
                vacancies.map((vacancy: JobVacancy) => {
                  return (
                    <CompanyVacancy
                      jobVacancy={vacancy}
                      jobApplyCount={vacancy.jobApplyCount}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BrowseJobPage;
