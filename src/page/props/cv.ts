export type TCV = {
    profile: TProfile
    experiences: TExperience[]
    educations: TEducation[]
    projects: TProject[]
    skills: TSkill[]
    index: number
}


export type TProfile = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    github: string,
    linkedin: string,
    position: string,
    summary: string,
}

export type TExperience = {
    id: number
    positionTitle: string,
    companyName: string,
    startDate: string,
    endDate: string,
    summary: string
    type: string
}

export type TEducation = {
    id: number
    schoolName: string
    startDate: string
    endDate: string
    degree: string
    fieldOfStudy: string
}

export type TProject = {
    id: number
    projectName: string,
    projectDescription: string,
}

export type TSkill = {
    id: number
    name: string
}