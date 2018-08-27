import { Injectable } from "@angular/core";
import { RentalTypeDto } from "../";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Operation } from "fast-json-patch";
import { environment } from "../../../environments/environment"

@Injectable()
export class RentalTypeService {

    constructor(
        private http: HttpClient,
    ) {}
      
    public list(): Observable<RentalTypeDto[]> {
        return this.http.get<RentalTypeDto[]>(
            environment.API_URL + `RentalType/`
        );
    }

    public get(id: number): Observable<RentalTypeDto> {
        return this.http.get<RentalTypeDto>(
            environment.API_URL + `RentalType/${id}`
        );
    }

    public patch(id: number, patch: Operation[]): Observable<RentalTypeDto>{
        return this.http.patch<RentalTypeDto>(
            environment.API_URL + `RentalType/${id}`, patch
        );
    }
}