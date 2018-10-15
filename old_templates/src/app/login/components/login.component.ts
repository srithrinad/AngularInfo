import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthenticationService,LoginGaurdService, globalConstants } from '../../shared';
 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public EMAIL_REGEXP =  globalConstants.email_regExp;
  loginErr: string = null;
  loginLoading: boolean = false;
  isRedirect: boolean;  

  constructor( private localStorage: LocalStorageService, 
               private http: AuthenticationService,
               private loginGuardService:  LoginGaurdService,
               private router: Router  ) { }

  ngOnInit() {
  }

  
  logout() {
    this.localStorage.clearAll();
    
    this.loginErr = null;
  }

  onLoginSubmit(data) {
    if (data.valid) {
      
      this.loginLoading = true;
      this.http.login(data.value).subscribe(
        res => {
          this.loginErr = null;
          this.localStorage.set('token', res.access_token);
          let redirect = this.loginGuardService.redirectUrl
            ? this.loginGuardService.redirectUrl
            : '/';
          this.loginLoading = false;
          this.router.navigateByUrl(redirect);
        },
        err => {
          this.loginErr = 'Invalid Email or Password';
        }
      );
    }
  }


}
