import { TSkill } from "@/page/props/cv";
import { useSkillStore } from "../../store/skill-store";


export default function FirstTemplateSkill({
  savedSkills = null,
}: {
  savedSkills?: TSkill[] | null;
}) {
  const { skills: storeSkills } = useSkillStore();
  const skills = storeSkills ?? savedSkills;

  if (skills.length < 1) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-start my-1">
        <h1 className="uppercase font-bold leading-none tracking-widest mb-2 text-black text-2xl">
          Skills
        </h1>
        {skills.map((skill, index) => (
          <h1
            key={index}
            className="font-normal text-start text-xl leading-normal"
          >
            # {skill.name}
          </h1>
        ))}
      </div>
    </>
  );
}
