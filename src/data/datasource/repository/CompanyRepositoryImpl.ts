import {CompanyRepository} from "@/domain/repository/CompanyRepository.ts";
import {Company} from "@/domain/model/Company.ts";
import {CompanyAPIEntity} from "@/data/datasource/api/entity/CompanyAPIEntity.ts";
import CompanyDataSource from "@/data/datasource/CompanyDataSource.ts";

export class CompanyRepositoryImpl implements CompanyRepository {
    datasource: CompanyDataSource;

    constructor(_datasource: CompanyDataSource) {
        this.datasource = _datasource;
    }

    deleteCompany(id: number): Promise<void> {
        return this.datasource.delete(id)
    }

    getAllCompany(): Promise<Company[]> {
        return this.datasource.getAll()
    }

    getCompany(id: number): Promise<Company> {
        return this.datasource.get(id)
    }

    insertBulkCompany(file: File): Promise<Company[]> {
        return this.datasource.saveBulk(file)
    }

    insertCompany(company: CompanyAPIEntity): Promise<Company> {
        return this.datasource.save(company);
    }

}