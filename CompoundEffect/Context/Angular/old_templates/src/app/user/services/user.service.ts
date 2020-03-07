import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Operation } from "fast-json-patch";
import { user } from "../model";
import { page } from "../../shared";
import { environment } from "../../../environments/environment"

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
    ) {}      
    
    public search(request:user): Observable<any> {
      return this.http.post<user>(
        environment.API_URL + `user/searchusers`, request
      );
    }

    public get(id: number): Observable<user> {
        return this.http.get<user>(
            environment.API_URL + `user/${id}`
        );
    }

    public patch(id: number, patch: Operation[]): Observable<user>{
        return this.http.patch<user>(
            environment.API_URL + `user/${id}`, patch
        );
    }

    public post(request: user): Observable<user>{
        return this.http.post<user>(
            environment.API_URL + `user/createuser`, request
        );
    }
}