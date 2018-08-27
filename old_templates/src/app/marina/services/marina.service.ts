import { Injectable } from "@angular/core";
import { RentalTypeDto } from "../../rental-type";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Operation } from "fast-json-patch";
import { Marina } from "../";
import { environment } from "../../../environments/environment"

@Injectable()
export class MarinaService {

    constructor(
        private http: HttpClient,
    ) {}
      
    public list(): Observable<Marina[]> {
        return this.http.get<Marina[]>(
            environment.API_URL + `Marina/`
        );
    }

    public get(id: number): Observable<Marina> {
        return this.http.get<Marina>(
            environment.API_URL + `Marina/${id}`
        );
    }

    public patch(id: number, patch: Operation[]): Observable<Marina>{
        return this.http.patch<Marina>(
            environment.API_URL + `Marina/${id}`, patch
        );
    }
}