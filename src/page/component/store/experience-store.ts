
import { TExperience } from "@/page/props/cv";
import { create } from "zustand";

interface IExperiencesStore {
    experiences: TExperience[];
    insertExperience: () => void;
    removeExperience: (id: number) => void;
    updateExperienceData: (index: number, key: keyof TExperience, value: any) => void;
    setInitialData: (experiences: TExperience[]) => void;
}

const defaultExperience: TExperience = {
    id: 1,
    positionTitle: "Software Developer",
    companyName: "Google",
    startDate: "2023",
    endDate: "Present",
    summary: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus.",
    type: "Fulltime",
};

export const useExperienceStore = create<IExperiencesStore>((set) => ({
    experiences: [defaultExperience],
    insertExperience: () =>
        set((state) => ({
            experiences: [
                ...state.experiences,
                {
                    id: state.experiences.length > 0 ? state.experiences[state.experiences.length - 1].id + 1 : 1,
                    positionTitle: "",
                    companyName: "",
                    startDate: "",
                    endDate: "",
                    summary: "",
                    type: "",
                },
            ],
        })),
    removeExperience: (id: number) =>
        set((state) => ({
            experiences: state.experiences.filter((experience) => experience.id !== id),
        })),
    updateExperienceData: (index: number, key: keyof TExperience, value: any) =>
        set((state) => ({
            experiences: state.experiences.map((experience, i) =>
                i === index ? { ...experience, [key]: value } : experience
            ),
        })),
    setInitialData: (experiences: TExperience[]) =>
        set(() => ({
            experiences,
        })),
}));
