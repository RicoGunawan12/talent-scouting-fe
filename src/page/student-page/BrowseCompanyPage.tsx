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
      if (location === " ") {
        setLocation("");
      }
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

        <div className="flex mt-10 w-full relative max-md:justify-center">
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
                    <SelectItem value=" ">All</SelectItem>
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
