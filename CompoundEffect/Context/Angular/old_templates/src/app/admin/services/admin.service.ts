import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Operation } from "fast-json-patch";
import { AdminUser, AdminRole, UserMarinaRole, AdminUserSearch } from '../model';
import { Marina } from '../../marina';
import { environment } from "../../../environments/environment"


@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
  ) { }


  public GetMarinas(): Observable<Marina[]> {
    return this.http.get<Marina[]>(
      environment.API_URL + `Admin/GetMarinas`
    )
  }


  public GetAdminRoles(): Observable<AdminRole[]> {
    return this.http.get<AdminRole[]>(
      environment.API_URL + `Admin/GetAdminRoles`
    )
  }


  public GetAdminUsersList(request: AdminUserSearch): Observable<AdminUser[]> {
    return this.http.post<AdminUser[]>(
      environment.API_URL + `Admin/GetAdminUsersList`, request
    )
  }

  public GetUserMarinaRoleList(userId: string): Observable<UserMarinaRole[]> {
    return this.http.get<UserMarinaRole[]>(
      environment.API_URL + `Admin/GetUserMarinaRoleList/` + userId
    )
  }


  public UpdateUserMarinaRole(request: UserMarinaRole): Observable<UserMarinaRole[]> {
    return this.http.post<UserMarinaRole[]>(
      environment.API_URL + `Admin/UpdateUserMarinaRole`, request
    )
  }

  public DeleteUserMarinaRole(request: UserMarinaRole): Observable<UserMarinaRole[]> {
    return this.http.post<UserMarinaRole[]>(
      environment.API_URL + `Admin/DeleteUserMarinaRole`, request
    )
  }


}
