
import { TProfile } from "@/page/props/cv";
import { create } from "zustand";

interface IProfileStore {
    profile: TProfile
    updateData: (key: keyof TProfile, value: string) => void,
    setInitialData: (profile: TProfile) => void
}

const defaultProfile = {
    firstName: "Ricky",
    lastName: "Wijaya",
    phone: "08123456789",
    email: "ricky.wijaya@binus.ac.id",
    github: "ricky.wijaya",
    linkedin: "ricky.wijaya",
    position: "Senior Software Engineer",
    summary: "Highly-skilled and motivated senior software engineer with 9 years of experience. Enhanced performance of 24 applications using ASP.NET Web Forms and MVC Razor. Increased revenue by 8% by analyzing and improving app monetization strategies. Seeking to draw on proven software development and engineering skills to increase and improve Lexor &apos;s impressive line of applications. Facilitated the development of a top-selling Android mobile application. Eager to apply comprehensive software creation and maintenance expertise for A+Soft.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww",
}

export const useProfileStore = create<IProfileStore>((set) => ({
    profile: defaultProfile,
    updateData: (key: keyof TProfile, value: string) =>
        set((state) => ({
            profile: {
                ...state.profile,
                [key]: value,
            },
        })),
    setInitialData: (profile: TProfile) =>
        set(() => ({
            profile,
        })),
}))