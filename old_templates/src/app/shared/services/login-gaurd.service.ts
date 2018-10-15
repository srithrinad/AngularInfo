import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, Observer, Subject } from 'rxjs/Rx';
import { LocalStorageService } from "angular-2-local-storage"
import { AuthenticationService } from './authentication.service'

@Injectable()
export class LoginGaurdService {

  public isLoggedIn: boolean = false

	public redirectUrl:string;

	constructor(private authService: AuthenticationService,
				private localStorage: LocalStorageService,
				private router: Router){

	}

  
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.redirectUrl = state.url
		return this.checkAdmin(this.redirectUrl)
	}
 
  checkAdmin(url: string): boolean {
		if (this.isLoggedIn) {return true}
		else{
			this.authService.isAdmin().subscribe(res => {
				this.isLoggedIn = true
				this.router.navigateByUrl(url)
			}, 
			err => {
				this.isLoggedIn = false
				this.authService.redirectUrl = url
				this.router.navigateByUrl('/login')
			})
		}
	}
}
