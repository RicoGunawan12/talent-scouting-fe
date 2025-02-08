import { TProject } from "@/page/props/cv";
import { useProjectStore } from "../../store/project-store";


export default function FirstTemplateProject({
  savedProjects = null,
}: {
  savedProjects?: TProject[] | null;
}) {
  const { projects: storeProjects } = useProjectStore();
  const projects = storeProjects ?? savedProjects;
  if (projects.length < 1) {
    return null;
  }
  return (
    <>
      <div className="flex flex-col items-start mr-1">
        <h1 className="uppercase font-bold leading-none tracking-widest mb-2 text-black">
          Projects
        </h1>
        {projects.map((project, index) => (
          <div key={index} className="my-1">
            <h1 className="font-semibold text-start text-l leading-none">
              {project.projectName}
            </h1>
            <h1
              className="text-m text-wrap my-1"
              dangerouslySetInnerHTML={{
                __html: project.projectDescription.replace(/\n/g, '<br />'),
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
