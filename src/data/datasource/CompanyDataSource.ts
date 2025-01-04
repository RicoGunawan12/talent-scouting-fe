import {Company} from "@/domain/model/Company.ts";
import {CompanyAPIEntity} from "@/data/datasource/api/entity/CompanyAPIEntity.ts";

export default interface CompanyDataSource {
    get(id: number): Promise<Company>;
    save(company: CompanyAPIEntity): Promise<Company>;
    delete(id: number): Promise<void>;
    getAll(): Promise<Company[]>;
    saveBulk(file: File): Promise<Company[]>;
}