import { create } from "zustand";

interface ITemplateStore{
    index: number
    setTemplate: (index: number) => void
}

export const useTemplateStore = create<ITemplateStore>()((set) => ({
    index: 0,
    setTemplate: (index: number) => set({index: index})
}))