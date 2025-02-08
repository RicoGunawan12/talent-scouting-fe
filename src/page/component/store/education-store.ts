import { TEducation } from "@/page/props/cv";
import { create } from "zustand"

interface IEducationStore {
    educations: TEducation[]
    insertEducation: () => void
    removeEducation: (id: number) => void
    updateEducationData: (index: number, key: keyof TEducation, value: any) => void;
    setInitialData: (educations: TEducation[]) => void;
}

const defaultEducation = {
    id: 1,
    schoolName: "Bina Nusantara University",
    startDate: "2021",
    endDate: "Present",
    degree: "Undergraduate",
    fieldOfStudy: "Mobile Application and Technology",
}

export const useEducationStore = create<IEducationStore>((set) => ({
    educations: [defaultEducation],
    insertEducation: () =>
        set((state) => ({
            educations: [
                ...state.educations,
                {
                    id: state.educations.length > 0 ? state.educations[state.educations.length - 1].id + 1 : 1,
                    schoolName: "",
                    startDate: "",
                    endDate: "",
                    degree: "",
                    fieldOfStudy: "",
                },
            ],
        })),

    removeEducation: (id: number) =>
        set((state) => ({
            educations: state.educations.filter((education) => education.id !== id),
        })),
    updateEducationData: (index: number, key: keyof TEducation, value: any) =>
        set((state) => ({
            educations: state.educations.map((education, i) =>
                i === index ? { ...education, [key]: value } : education
            ),
        })),
    setInitialData: (educations: TEducation[]) =>
        set(() => ({
            educations,
        })),
}))