import { Injectable } from '@angular/core';
import { UserService } from '../services'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap} from 'rxjs/operators'
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LoadUsersSuccess, LOAD_USERS,GET_USER, GetUserSuccess, UPDATE_USER,UpdateUserSuccess,ADD_USER,AddUserSuccess,ServerError} from './user.actions'; 
import { user } from '../model' 
 
 
 
 

@Injectable()
export class UserEffects {
    @Effect() $loadUsers: Observable<Action> = this.actions$.ofType(LOAD_USERS)
    .map(toPayload)
    .mergeMap(payload => {
        return this.userService.search(payload)        
        .map((data: any) => {           
            return new LoadUsersSuccess(data);
        });

    });

    @Effect() $getUser: Observable<Action> = this.actions$.ofType(GET_USER)
    .map(toPayload)
    .mergeMap(payload => {
        return this.userService.get(payload)      
        .map((data: user) => {           
            return new GetUserSuccess(data);
        }).catch(err => of(new ServerError(err)) ) ;

    });

    @Effect() $updateUser: Observable<Action> = this.actions$.ofType(UPDATE_USER)
    .map(toPayload)
    .mergeMap(  payload  => {
        return this.userService.patch(payload.id,payload.patch)       
        .map((data: user) => {           
            return new UpdateUserSuccess(data);
        }).catch(err => of(new ServerError(err)) ) ;

    });

    @Effect() $addUser: Observable<Action> = this.actions$.ofType(ADD_USER)
    .map(toPayload)
    .mergeMap(  payload  => {
        return this.userService.post(payload)       
        .map((data: user) => {           
            return new AddUserSuccess(data);
        }).catch(err => of(new ServerError(err)));

    });


    constructor(       
        private actions$: Actions,private userService: UserService
    ) {}
}
