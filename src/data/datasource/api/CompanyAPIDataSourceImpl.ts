import CompanyDataSource from "@/data/datasource/CompanyDataSource.ts";
import {Company} from "@/domain/model/Company.ts";
import axios from "axios";
import {CompanyAPIEntity} from "@/data/datasource/api/entity/CompanyAPIEntity.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default class CompanyAPIDataSourceImpl implements CompanyDataSource {
    private axiosInstance = axios.create({
        baseURL: BASE_URL + "company",
        transformResponse: [function (response) {
            let resp

            try {
                resp = JSON.parse(response);
            } catch (e) {
                throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(e)}`)
            }

            return resp;
        }]
    })

    async delete(id: number): Promise<void> {
        try {
            const response = await this.axiosInstance({
                method: "DELETE",
                url: "/delete",
                data: id
            });
            return response.data;
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }

    async getAll(): Promise<Company[]> {
        try {
            const response = await this.axiosInstance({
                method: "GET",
                url: "/getAll"
            });
            return response.data;
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }

    async get(id: number): Promise<Company> {
        try {
            const response = await this.axiosInstance({
                method: "GET",
                url: `/get/${id}`,
            });
            return response.data;
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }

   async saveBulk(file: File): Promise<Company[]> {
        try {
            const response = await this.axiosInstance({
                method: "POST",
                url: `/saveBulk`,
                data: file
            });
            return response.data;
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }

    async save(company: CompanyAPIEntity): Promise<Company> {
        try {
            const response = await this.axiosInstance({
                method: "POST",
                url: `/save`,
                data: company
            });
            return response.data;
        } catch (e) {
            console.log(e);
            throw(e);
        }
    }
}