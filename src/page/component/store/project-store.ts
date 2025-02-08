
import { TProject } from "@/page/props/cv"
import { create } from "zustand"

export interface IProject {
    id: number
    projectName: string,
    projectDescription: string,
}

interface IProjectsStore {
    projects: IProject[]
    insertProject: () => void
    removeProject: (id: number) => void
    updateProjectData: (index: number, key: keyof TProject, value: any) => void;
    setInitialData: (educations: TProject[]) => void;
}

const defaultProject = {
    id: 1,
    projectName: "Personal Branding CV Generator",
    projectDescription: "Website application using Next JS for user to find the latest company recomendation and create a cv.",
}

export const useProjectStore = create<IProjectsStore>((set) => ({
    projects: [defaultProject],
    insertProject: () =>
        set((state) => ({
            projects: [
                ...state.projects,
                {
                    id: state.projects.length > 0 ? state.projects[state.projects.length - 1].id + 1 : 1,
                    projectName: "",
                    projectDescription: "",
                }
            ]
        })),
    removeProject: (id: number) =>
        set((state) => ({
            projects: state.projects.filter((project) => project.id !== id),
        })),
    updateProjectData: (index: number, key: keyof TProject, value: any) =>
        set((state) => ({
            projects: state.projects.map((project, i) =>
                i === index ? { ...project, [key]: value } : project
            ),
        })),
    setInitialData: (projects: TProject[]) =>
        set(() => ({
            projects,
        })),
}))