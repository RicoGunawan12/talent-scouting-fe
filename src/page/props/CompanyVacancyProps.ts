import { JobVacancy } from '../student-page/HomePage';
import { CompanyCardProps } from './CompanyCardProps';

export interface CompanyVacancyProps {
    StopTime: Date;
    Title: String;
    Description: String;
    CompanyImage: string;
    VacancyId: number
    CompanyId: Number
}

export interface JobTypeProps {
    id: number;
    jobTypeName: string;
}

export interface VacancyResponse {
    Id: string,
    CompanyId: string,
    Company: {
        Id: string,
        UserId: string,
        Name: string,
        LogoUrl: string,
        Description: string,
        Location: string,
        CreatedAt: Date,
        UpdatedAt: Date,
        DeletedAt: Date,
        // User: {
        //     "Id": "00000000-0000-0000-0000-000000000000",
        //     "Email": "",
        //     "Password": "",
        //     "Role": "",
        //     "CreatedAt": "0001-01-01T00:00:00Z",
        //     "UpdatedAt": "0001-01-01T00:00:00Z",
        //     "DeletedAt": null
        // }
    },
    JobTypeId: number,
    JobType: {
        Id: number,
        JobTypeName: string,
        CreatedAt: Date
    },
    TimeStamp: Date,
    JobPosition: string,
    EndDateTime: Date,
    JobDescription: string,
    Location: string,
    SalaryRange: string,
    WorkTimeType: string,
    JobVacancySkills: {
            JobVacancyId: string,
            SkillId: number,
            Skill: {
                Id: number,
                SkillName: string,
                CreatedAt: Date
            },
            SkillDetail: string
        }[],
    JobVacancyResponsibilities: {
            Id: 1,
            JobVacancyId: string,
            ResponsibilityDetail: string
    }[],
    ExtrasInfos: {
            Id: number,
            ExtrasTitle: string,
            ExtrasDescription: string,
            JobVacancyId: string
    }[]
}

export interface CompanyVacancyWithApplyCountProps {
    jobVacancy: VacancyResponse;
    jobApplyCount: number;
}

export interface VacancyProps {
    jobVacancy: JobVacancy;
    jobApplyCount: number;
}


export interface VacancyDetailResponse {
    jobVacancy: VacancyResponse;
    skills: Skills[];
    jobResponsibilities: Responsibility[];
    extrasInfo: ExtrasInfo[]
}


export interface ExtrasInfo {
    id: number;
    jobVacancy: VacancyResponse;
    extrasTitle: string;
    extrasDescription: string
}

export interface Responsibility {
    id: number;
    jobVacancy: VacancyResponse;
    responsibilityDetail: string;
}

export interface Skills {
    jobVacancySkillPK: SkillPK
    jobVacancy: VacancyResponse
    skill: Skill;
    skillDetail: string
}

export interface SkillPK {
    jobVacancyId: number;
    skillId: number
}

export interface Skill {
    id: number;
    skillName: string
}