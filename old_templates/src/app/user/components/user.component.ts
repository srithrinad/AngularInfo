 

import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { compare, deepClone } from "fast-json-patch";
import { UserService } from '../services'; 
import { user } from '../model';
import Quill from 'quill';
import { Store } from '@ngrx/store';
import { GetUser, UpdateUser,Redirect,AddUser } from '../store';
import {globalConstants} from '../../shared'
 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    public EMAIL_REGEXP =  globalConstants.email_regExp;
    public userId: number;
    public serverErr: string = "Could not complete the request, Server Error!"
    public item: user;
    private original: user;
    public showError:boolean = false;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private store: Store<any>) {
        this.item = this.original = new user();
        this.store.select('user').subscribe(userStore => {   
            console.log(userStore)    ;
          if(userStore){
            if(userStore.updated){
                this.router.navigateByUrl('user');
                this.store.dispatch(new Redirect());
            }
            else if(userStore.data){
                this.original = deepClone(userStore.data); 
                this.item = userStore.data;
            }
            this.showError = userStore.error;
        }
            
        })
    }

    public ngOnInit() {
        this.userId = this.route.snapshot.params['userId'];
        if(this.userId > 0)
            this.store.dispatch(new GetUser(this.userId));
    }

    public save(data): void {
        if (data.valid) { 
            if(this.userId == 0){
                this.store.dispatch(new AddUser(this.item));
            }
            else{           
                var patch = compare(this.original, this.item);
                this.store.dispatch(new UpdateUser({id:this.userId, patch:patch}));
            }
        }
        
    }
}
