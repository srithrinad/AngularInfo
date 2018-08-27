import {Component, ViewEncapsulation} from "@angular/core";
import {Router} from '@angular/router'
import {LocalStorageService} from "angular-2-local-storage"
import {LoginGaurdService} from '../services'



@Component({
	selector: 'header' ,
	templateUrl:  './header.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls:['./simple.css']
})
export class HeaderComponent {
	public loggedOut: boolean = false
	menuOpen = false;	 

	constructor(private router: Router, 
						private localStorage: LocalStorageService,
						private loggedInAuthGuard: LoginGaurdService,){
	}

	localSaved() {
	  return this.localStorage.get('token') ? true : false
	}

	logOut() {
		this.localStorage.clearAll()
		this.loggedInAuthGuard.redirectUrl = null;
		this.loggedInAuthGuard.isLoggedIn = false;
		this.router.navigateByUrl('/login')
	}

	toggleMenu(event) {
		this.menuOpen = !this.menuOpen
	}
}