import {Company} from "@/domain/model/Company.ts";
import {CompanyAPIEntity} from "@/data/datasource/api/entity/CompanyAPIEntity.ts";

export interface CompanyRepository {
    getCompany(id: number): Promise<Company>;
    insertCompany(company: CompanyAPIEntity): Promise<Company>;
    deleteCompany(id: number): Promise<void>;
    getAllCompany(): Promise<Company[]>;
    insertBulkCompany(file: File): Promise<Company[]>;
}