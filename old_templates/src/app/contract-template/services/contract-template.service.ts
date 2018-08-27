import { Injectable } from "@angular/core";
import { RentalTypeDto } from "../../rental-type";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Operation } from "fast-json-patch";
import { ContractTemplate } from "../";
import { environment } from "../../../environments/environment"

@Injectable()
export class ContractTemplateService {

    constructor(
        private http: HttpClient,
    ) {}
      
    public list(): Observable<ContractTemplate[]> {
        return this.http.get<ContractTemplate[]>(
            environment.API_URL + `ContractTemplate/`
        );
    }

    public get(id: number): Observable<ContractTemplate> {
        return this.http.get<ContractTemplate>(
            environment.API_URL + `ContractTemplate/${id}`
        );
    }

    public patch(id: number, patch: Operation[]): Observable<ContractTemplate>{
        return this.http.patch<ContractTemplate>(
            environment.API_URL + `ContractTemplate/${id}`, patch
        );
    }
}