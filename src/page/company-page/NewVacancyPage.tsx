import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decrypt } from "../util/Utility";
import Cookies from "js-cookie";
import { useToast } from "@/components/hooks/use-toast";
import { CalendarForm } from "../component/CalendarInput";
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

export interface RequirementProps {
  idx: number;
  responsibilityDetail: string;
}

export interface SkillProps {
  idx: number;
  skillTitle: string;
  skillDescription: string;
}

export interface SectionProps {
  idx: number;
  extrasTitle: string;
  extrasDescription: string;
}

export interface DBSkillProps {
  Id: number;
  SkillName: string;
}

function NewVacancyPage() {
  const nav = useNavigate();
  const { toast } = useToast();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const openAlertDialog = () => {
    setAlertDialogOpen(true);
  };

  const handleAddSkill = async () => {
    
    try {
      const body = {
        skillName: newSkill,
      };
  
      await axios.post(import.meta.env.VITE_API + "skill/addNewSkill", body, {
        headers: {
          Authorization: `Bearer ${decrypt(Cookies.get("token"))}`
        }
      });
      toast({
        variant: "default",
        title: "New Skill Added!",
        description: "You can use the skill that you inserted!",
      });
      setUpdate(!update);
      setAlertDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Add skill error",
        // description: "You can use the skill that you inserted!",
      });
      
    }
    
  };

  const [update, setUpdate] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [dbSkills, setDbSkills] = useState<DBSkillProps[]>([]);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [salaryStart, setSalaryStart] = useState<number>();
  const [salaryEnd, setSalaryEnd] = useState<number>();
  const [workTimeType, setWorkTimeType] = useState<string>("");
  const [jobType, setJobType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [responsibilities, setResponsibility] = useState<RequirementProps[]>([
    {
      idx: 0,
      responsibilityDetail: "",
    },
  ]);
  const [skills, setSkills] = useState<SkillProps[]>([
    {
      idx: 0,
      skillTitle: "",
      skillDescription: "",
    },
  ]);
  const [sections, setSections] = useState<SectionProps[]>([]);

  const [idx, setIdx] = useState<number>(1);
  const [skillIdx, setSkillIdx] = useState<number>(1);
  const [sectionIdx, setSectionIdx] = useState<number>(0);

  const addInput = () => {
    setResponsibility([
      ...responsibilities,
      { idx: idx, responsibilityDetail: "" },
    ]);
    setIdx(idx + 1);
  };

  const removeComponent = (idx: number) => {
    if (responsibilities.length >= 2) {
      setResponsibility(responsibilities.filter((req) => req.idx !== idx));
    }
  };

  const handleInputChangeResponsibility = (idx: number, value: string) => {
    setResponsibility(
      responsibilities.map((req) =>
        req.idx === idx ? { ...req, responsibilityDetail: value } : req
      )
    );
  };

  const handleInputChangeSectionDescription = (idx: number, value: string) => {
    setSections(
      sections.map((section, index) =>
        index === idx ? { ...section, extrasDescription: value } : section
      )
    );
  };

  const handleInputChangeSectionTitle = (idx: number, value: string) => {
    setSections(
      sections.map((section, index) =>
        index === idx ? { ...section, extrasTitle: value } : section
      )
    );
  };

  const handleInputChangeSkillTitle = (idx: number, value: string) => {
    if (value === "+ Other Skill") {
      openAlertDialog();
      value = newSkill;
    }

    setSkills(
      skills.map((section, index) =>
        index === idx ? { ...section, skillTitle: value } : section
      )
    );
  };

  const handleInputChangeSkillDescription = (idx: number, value: string) => {
    setSkills(
      skills.map((section, index) =>
        index === idx ? { ...section, skillDescription: value } : section
      )
    );
  };

  const addSkillInput = () => {
    setSkills([
      ...skills,
      { idx: skillIdx, skillTitle: "", skillDescription: "" },
    ]);
    setSkillIdx(skillIdx + 1);
  };

  const removeSkillComponent = (idx: number) => {
    if (skills.length >= 2) {
      setSkills(skills.filter((skill) => skill.idx !== idx));
    }
  };

  const addSectionInput = () => {
    setSections([
      ...sections,
      {
        idx: sectionIdx,
        extrasTitle: "",
        extrasDescription: "",
      },
    ]);
    setSectionIdx(sectionIdx + 1);
  };

  const removeSectionComponent = (idx: number) => {
    setSections(sections.filter((section) => section.idx !== idx));
  };

  const handlePublish = async () => {
    try {
        const extractedSkills = skills.map(
          ({ skillTitle, skillDescription }) => ({
            skill_id: parseInt(skillTitle),
            skill_detail: skillDescription,
          })
        );

        const extractedResponsibility = responsibilities.map(
          ({ responsibilityDetail }) => ({
            responsibility_detail: responsibilityDetail
          })
        );

        const extractedSection = sections.map(
          ({ extrasTitle, extrasDescription }) => ({
            extras_title: extrasTitle,
            extras_description: extrasDescription,
          })
        );

      const vacancyBody = {
        company_id: decrypt(Cookies.get("id")),
        job_type_id: parseInt(jobType || "0"),
        // timeStamp: new Date(),
        job_position: jobPosition,
        end_date_time: selectedDate,
        job_description: jobDescription,
        location: jobLocation,
        salary_range:
          "Rp " +
          new Intl.NumberFormat("id-ID").format(salaryStart || 0)?.toString() +
          " - Rp " +
          new Intl.NumberFormat("id-ID").format(salaryEnd || 0)?.toString(),
        work_time_type: workTimeType,
        job_vacancy_skills: extractedSkills,
        job_vacancy_responsibilities: extractedResponsibility,
        extras_infos: extractedSection
      };
      console.log(vacancyBody);
      

      const vacancy = await axios.post(
        import.meta.env.VITE_API + "jobVacancy/createJobVacancy",
        vacancyBody,
        {
          headers: {
            Authorization: `Bearer ${decrypt(Cookies.get("token"))}`
          }
        }
      );
      toast({
        variant: "default",
        title: "New Vacancy Added!",
        description: "Your vacancy is published!",
      });

      // console.log(vacancy.data);

      
      
      nav("/company/vacancy");
    } catch (error) {
      console.log(error);
      
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  useEffect(() => {
    async function getSkill() {
      const getSkill = await axios.get(
        import.meta.env.VITE_API + "skill/getSkill", {
          headers: {
            Authorization: `Bearer ${decrypt(Cookies.get("token"))}`
          }
        }
      );
      console.log(getSkill.data);
      
      setDbSkills(getSkill.data);
    }
    getSkill();
  }, [update]);

  return (
    <Layout>
      <div className="mx-[70px] pb-10">
        <div className="text-[32px] mt-4 text-center font-semibold">
          New Vacancy
        </div>

        <div className="flex flex-col items-center">
          <div className="mx-[70px] max-w-[1000px] w-full">
            

            <div className="border-[1px] shadow-md border-[#F2F2F2] px-14 py-4 rounded-md mt-10">

              <div className="text-[14px] font-semibold">Basic Information</div>

              <div className="my-4">
                <label className="font-medium">Job Position</label>
                <Input
                  className="mt-2 border-[#b1b1b1]"
                  placeholder="Job Position"
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>

              <div className="my-4">
                <label className="font-medium">Job Description</label>
                <Textarea
                  className="mt-2 border-[#b1b1b1]"
                  placeholder="Job Description"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="my-4">
                <div className="mb-2">
                  <label className="font-medium">Work Time Type</label>
                </div>
                <Select onValueChange={(value) => setWorkTimeType(value)}>
                  <SelectTrigger className="border-[#b1b1b1]">
                    <SelectValue placeholder="Work Time Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="my-4">
                <div className="mb-2">
                  <label className="font-medium">Job Type</label>
                </div>
                <Select onValueChange={(value) => setJobType(value)}>
                  <SelectTrigger className="border-[#b1b1b1]">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Work From Office</SelectItem>
                    <SelectItem value="2">Work From Home</SelectItem>
                    <SelectItem value="3">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="border-[1px] shadow-md border-[#F2F2F2] px-14 py-4 rounded-md mt-16">
            
              <div className="text-[14px] font-semibold">Additional Information</div>
              
              <div className="my-4">
                <label className="font-medium">Job Location</label>
                <Input
                  className="mt-2 border-[#b1b1b1]"
                  placeholder="Job Location"
                  onChange={(e) => setJobLocation(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between my-4 w-full">
                <div className="w-[45%]">
                  <label className="font-medium">Salary Range (In IDR)</label>
                  <Input
                    className="mt-2 border-[#b1b1b1] w-full"
                    placeholder="Start Range"
                    onChange={(e) => setSalaryStart(parseInt(e.target.value))}
                  />
                </div>

                <div className="text-[24px] mt-8 flex items-center h-full">
                  <div>-</div>
                </div>

                <div className="my-4 mt-[24px] w-[45%]">
                  <Input
                    className="mt-6 border-[#b1b1b1] w-full"
                    placeholder="End Range"
                    onChange={(e) => setSalaryEnd(parseInt(e.target.value))}
                  />
                </div>
              </div>
              

              <div className="my-4">
                <div className="mb-2">
                  <label className="font-medium ">End Date</label>
                </div>
                <CalendarForm onDateChange={setSelectedDate} />
              </div>
            </div>

            <div className="border-[1px] shadow-md border-[#F2F2F2] px-14 py-4 rounded-md mt-16">
              <div className="text-[14px] font-semibold">Requirement Information</div>

              <div className="mb-6 mt-6">
                <label className="font-medium">Responsibility (Min 1)</label>
                <div className="h-full">
                  {responsibilities.map((requirement, idx) => {
                    return (
                      <div className="flex h-full" key={requirement.idx}>
                        <Input
                          className="mt-2 border-[#b1b1b1]"
                          placeholder="Responsibility"
                          onChange={(e) =>
                            handleInputChangeResponsibility(
                              requirement.idx,
                              e.target.value
                            )
                          }
                        />
                        <div className="h-current flex items-center ml-4 mt-2">
                          <div
                            className="justify-center text-white w-[25px] h-[25px] items-center rounded-md bg-[#ff5858] transition text-[20px] flex hover:cursor-pointer hover:bg-[#dd4545]"
                            onClick={() => removeComponent(requirement.idx)}
                          >
                            -
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full flex justify-center mt-6">
                  <div
                    onClick={addInput}
                    className="flex text-[14px] p-2 font-semibold bg-[#4d8fb3] text-white border-0 justify-center items-center rounded-md border-[1px] border-[#b1b1b1] hover:cursor-pointer transition hover:bg-[#357ea4]"
                  >
                    + Add Responsibility
                  </div>
                </div>
              </div>

              <div className="my-4">
                <div className="mb-2">
                  <label className="font-medium">Skills</label>
                </div>

                <div className="text-[gray]">
                  <div className="font-semibold">Example</div>
                  <div className="mb-2">Skill title: Java Programming</div>
                  <div className="mt-2 mb-4">
                    Description: Proficient in Java programming with a strong
                    understanding of object-oriented principles, data structures,
                    and algorithms. Capable of developing robust, scalable, and
                    maintainable code for various applications. Familiar with the
                    latest Java versions and features.
                  </div>
                </div>

                {skills.map((skill, idx) => {
                  return (
                    <div className="my-4" key={skill.idx}>
                      <div className="flex h-[40px] w-full justify-between items-center">
                        <div className="font-medium">Skill</div>
                        <div
                          className="flex justify-center text-white w-[25px] h-[25px] items-center rounded-md bg-[#ff5858] text-[20px] hover:cursor-pointer hover:bg-[#dd4545]"
                          onClick={() => removeSkillComponent(skill.idx)}
                        >
                          -
                        </div>
                      </div>

                      <Select
                        onValueChange={(skill) => {
                          handleInputChangeSkillTitle(idx, skill);
                        }}
                      >
                        <SelectTrigger className="border-[#b1b1b1] mt-2 border-[#b1b1b1]">
                          <SelectValue placeholder="Skill Title" />
                        </SelectTrigger>
                        <SelectContent className="overflow-y-auto h-[250px]">
                          {dbSkills.map((skill) => {
                            return (
                              <SelectItem
                                value={skill?.Id.toString()}
                                key={skill?.Id}
                              >
                                {skill.SkillName}
                              </SelectItem>
                            );
                          })}
                          <SelectItem value={"+ Other Skill"}>
                            + Other Skill
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <Textarea
                        className="mt-4 border-[#b1b1b1]"
                        placeholder="Skill Description"
                        onChange={(e) =>
                          handleInputChangeSkillDescription(idx, e.target.value)
                        }
                      ></Textarea>
                    </div>
                  );
                })}
                <AlertDialog open={alertDialogOpen} key={idx}>
                  <AlertDialogTrigger asChild></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-center">
                        Add New Skill Based On Your Requirements
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="my-6 text-[black]">
                          <div>Skill</div>

                          <div>
                            <Input
                              placeholder="New Skill"
                              onChange={(e) => setNewSkill(e.target.value)}
                            />
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setAlertDialogOpen(false)}
                      >
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction onClick={handleAddSkill}>
                        Add New Skill
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="w-full flex justify-center mt-6">
                  <div
                    onClick={addSkillInput}
                    className="flex text-[14px] font-semibold bg-[#4d8fb3] text-white border-0 justify-center items-center rounded-md p-2 border-[1px] border-[#b1b1b1] transition hover:cursor-pointer hover:bg-[#357ea4]"
                  >
                    + Add Skill
                  </div>
                </div>
              </div>

              

            </div>

            
            <div className="border-[1px] shadow-md border-[#F2F2F2] px-14 py-4 rounded-md mt-16">

              {sections.map((section, idx) => {
                return (
                  <div className="my-4" key={section.idx}>
                    <div className="flex h-[40px] w-full justify-between items-center">
                      <div>New Section</div>
                      <div
                        className="justify-center text-white w-[25px] h-[25px] items-center rounded-md bg-[#ff5858] text-[20px] flex hover:cursor-pointer hover:bg-[#dd4545]"
                        onClick={() => removeSectionComponent(section.idx)}
                      >
                        -
                      </div>
                    </div>

                    <Input
                      className="mt-2 border-[#b1b1b1]"
                      placeholder="New Section Title"
                      onChange={(e) =>
                        handleInputChangeSectionTitle(idx, e.target.value)
                      }
                    />

                    <Textarea
                      className="mt-4 border-[#b1b1b1]"
                      placeholder="New Section Description"
                      onChange={(e) =>
                        handleInputChangeSectionDescription(idx, e.target.value)
                      }
                    ></Textarea>
                  </div>
                );
              })}

              <div className="text-[gray]">
                <div className="font-semibold">Section Example</div>
                <div className="mb-2">Section title: Benefit</div>
                <div className="mt-2 mb-4">
                  Description: You will get Free Parking, Salary, Annual Bonus,
                  and Health Assurance
                </div>
              </div>

              <div className="flex justify-center my-10">
                <Button
                  className="font-semibold bg-[#4d8fb3] hover:bg-[#357ea4]"
                  onClick={addSectionInput}
                >
                  + Add New Section
                </Button>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="fixed bottom-0 w-full">
        <div className="flex justify-center shadow-top-md py-4 bg-white mt-10">
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>
    </Layout>
  );
}

export default NewVacancyPage;
