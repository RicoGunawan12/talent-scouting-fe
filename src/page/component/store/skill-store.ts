
import { TSkill } from "@/page/props/cv";
import { create } from "zustand";

interface ISkillStore {
    skills: TSkill[]
    insertSkill: (name: string) => void
    removeSkill: (id: number) => void
    setInitialData: (skills: TSkill[]) => void
}

export const useSkillStore = create<ISkillStore>((set) => ({
    skills: [
        {
            id: 1,
            name: "HTML"
        },
        {
            id: 2,
            name: "CSS"
        },
        {
            id: 3,
            name: "Javascript"
        },

    ],
    insertSkill: (name: string) =>
        set((state) => ({
            skills: [
                ...state.skills,
                {
                    id: state.skills.length > 0 ? state.skills[state.skills.length - 1].id + 1 : 1,
                    name: name
                }
            ]
        })),
    removeSkill: (id: number) =>
        set((state) => ({
            skills: state.skills.filter((skill) => skill.id !== id),
        })),
    setInitialData: (skills: TSkill[]) =>
        set(() => ({
            skills,
        })),
}))