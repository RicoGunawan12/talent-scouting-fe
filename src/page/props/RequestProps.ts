import { StudentCardProps } from './StudentCardProps';
import { VacancyResponse } from './CompanyVacancyProps';
import { JobVacancy } from '../student-page/HomePage';

export interface StudentRequestProps {
    // jobApplyPK: StudentRequestPKProps;
    job_vacancy: JobVacancy;
    student: {
        id: string;
        gpa: number;
        name: string
        pictureUrl: string
        major: string
    };
    status: string;
    notes: string;
    companyNote: string
}

export interface StudentRequestPKProps {
    jobVacancyId: number;
    studentId: number;
}