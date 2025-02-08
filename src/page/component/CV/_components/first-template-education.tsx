import { TEducation } from "@/page/props/cv";
import { useEducationStore } from "../../store/education-store";

export default function FirstTemplateEducation({
  savedEducations = null,
}: {
  savedEducations?: TEducation[] | null;
}) {
  const { educations: storeEducations } = useEducationStore();
  const educations = storeEducations ?? savedEducations;

  return (
    <>
      <div className="flex flex-col items-start my-1">
        <h1 className="uppercase font-bold leading-none tracking-widest mb-2 text-black text-2xl">
          Education 
        </h1>
        {educations.map((education, index) => (
          <EducationItem key={index} education={education} />
        ))}
      </div>
    </>
  );
}

interface EducationItemProps {
  id: number;
  schoolName: string;
  startDate: string;
  endDate: string;
  degree: string;
  fieldOfStudy: string;
}

function EducationItem({ education }: { education: EducationItemProps }) {
  return (
    <>
      <div className="my-1">
        <h1 className="font-semibold text-start text-xl leading-normal">
          {education.schoolName}
        </h1>
        <h1 className="text-2xl text-gray-800 leading-normal">
          {education.degree} {education.fieldOfStudy}
        </h1>
        <h1 className="text-2xl leading-normal">
          {education.startDate} - {education.endDate}
        </h1>
      </div>
    </>
  );
}
