import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {LocalStorageService} from "angular-2-local-storage"
import {Observable} from 'rxjs/Rx';
import { environment } from '../../../environments/environment'; 

@Injectable()
export class AuthenticationService {
  redirectUrl: string
  constructor(private _http: HttpClient,
    private localStorage: LocalStorageService){

}

createAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
  var token = this.localStorage.get('token')
  headers = headers.set("Content-Type", "application/json")
  headers = headers.set("Authorization", `Bearer ${token}`)
  return headers;
}


isLoggedIn(): Observable<boolean> {
  let headers = new HttpHeaders()
  headers = this.createAuthorizationHeader(headers)
  let options : any  = {headers: headers} 
  return this._http.get(environment.API_URL + 'authorization/token/', options)  
  .catch((error: any) => Observable.throw(error || 'Server error'));
}

isAdmin(): Observable<boolean> {
  let headers = new HttpHeaders()
  headers = this.createAuthorizationHeader(headers)
  let options : any  = {headers: headers} 
  return this._http.get(environment.API_URL + 'Authorization/Admin', options)  
  .catch((error: any) => Observable.throw(error || 'Server error'));
}

login(data): Observable<any> {
  let headers = new HttpHeaders();
  headers = headers.set("Content-Type", "application/x-www-form-urlencoded");
  let options : any  = {headers: headers} 
  let encodedData = new URLSearchParams();
  encodedData.append('username', data.email);
  encodedData.append('password', data.password);
  encodedData.append('grant_type', 'password');
  return this._http.post(environment.API_URL + "connect/token", encodedData.toString(), options)     
    .catch((error: any) => {
      return Observable.throw(error.json().error || 'Server Error');
    });
}

}
