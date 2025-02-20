import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import CompanyCard from "../component/CompanyCard";
import "aos/dist/aos.css";
import AOS from "aos";
import axios from "axios";
import { CompanyCardProps } from "../props/CompanyCardProps";
import { env } from "node:process";
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
import { useToast } from "@/components/hooks/use-toast";
import { decrypt } from "../util/Utility";
import Cookies from "js-cookie";

export interface Company {
  id: string;
  UserId: string;
  name: string;
  logourl: string;
  description: string;
  location: string;
  createdAt: string; // ISO 8601 formatted date
  updatedAt: string; // ISO 8601 formatted date
  deletedAt: string | null; // ISO 8601 formatted date or null
  // user: User;
}

function BrowseCompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function getAllCompany() {
      setLoading(true);
      try {
        const response = await axios.post(
          import.meta.env.VITE_API + "company/getCompanyByFilter",
          {
            searchKeyword: search,
            location: location,
            name: "",
          },
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
          title: "Something went wrong",
          description: "Inform admin immediately!",
        });
      }
      setLoading(false);
    }
    AOS.init({ duration: 500 });
    getAllCompany();
  }, [search, location]);
  return (
    <Layout>
      <div className="mx-[8vw] mb-10 mt-6">
        <div className="flex flex-col items-center" data-aos="fade-up">
          <div className="text-center font-semibold text-[24px]">
            200+ Tech Company Around The World
          </div>
          <div className="mt-4">
            Explore opportunities with over 200 leading tech companies across
            the globe. From startups to established giants, these organizations
            are at the forefront of innovation. Find your next career move in a
            company that matches your ambitions.
          </div>
        </div>

        <div className="flex mt-10 w-full relative">
          <div
            className="w-1/4 min-h-[40vh] bg-[#F0F0F0] h-full rounded-sm p-4 sticky top-[15%] max-md:hidden"
            data-aos="fade-up"
          >
            <div className="font-bold">Filters</div>

            <Input
              className="my-2"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Company"
            />

            <div>
              <Select onValueChange={(value) => setLocation(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    <SelectItem value="Jakarta">Jakarta</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Medan">Medan</SelectItem>
                    <SelectItem value="Tangerang">Tangerang</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="font-bold mt-10">Filter Strong Position</div>

            <div>
              <CheckboxCustom text={"Front End Developer"} />
              <CheckboxCustom text={"Back End Developer"} />
              <CheckboxCustom text={"AI Engineer"} />
              <CheckboxCustom text={"Mobile Developer"} />
              <CheckboxCustom text={"Cyber Security"} />
              <CheckboxCustom text={"Data Analyst"} />
              <CheckboxCustom text={"Web Developer"} />
              <CheckboxCustom text={"Game Developer"} />
            </div> */}
          </div>

          <div className="w-3/4 ml-10" data-aos="fade-left">
            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : companies === null ? (
              <div className="text-center text-red-500">
                There is no company
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-10">
                {companies.map((company: Company, idx: number) => {
                  return (
                    <CompanyCard
                      Id={company.id}
                      Name={company.name}
                      LogoUrl={company.logourl}
                      Location={company.location}
                      VacancyCount={10}
                      Description={company.description}
                      key={idx}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BrowseCompanyPage;
