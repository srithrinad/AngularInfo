import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { LocalStorageService } from "angular-2-local-storage"
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  publicAPI:string = 'api/connect/token';
  constructor(public localStorage: LocalStorageService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.localStorage.get('token');     
    if (request.url.indexOf(this.publicAPI) == -1) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }     
    return next.handle(request);
  }
}
