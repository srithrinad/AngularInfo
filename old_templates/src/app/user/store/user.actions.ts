import { Action } from '@ngrx/store'
import { LoginGaurdService } from '../../shared/index';
import {user } from '../model'
export const ADD_USER = '[USER] AddUser'
export const ADD_USER_SUCCESS = '[USER] AddUserSuccess'
export const LOAD_USERS = '[USER] LoadUsers'
export const UPDATE_USER = '[USER] UpdateUser'
export const UPDATE_USER_SUCCESS = '[USER] UpdateUserSuccess'
export const LOAD_USERS_SUCCESS = '[USER] LoadUsersSuccess'
export const GET_USER = '[USER] GetUser'
export const GET_USER_SUCCESS = '[USER] GetUserSuccess'
export const REDIRECT = '[USER] Redirect'
export const SERVER_ERROR = '[USER] ServerError'

export class ServerError implements Action {
    readonly type = SERVER_ERROR;
    constructor(public payload: any) { }
}

export class LoadUsers implements Action {
    readonly type = LOAD_USERS;
    constructor(public payload: user) { }
}
 

export class LoadUsersSuccess implements Action {
    readonly type = LOAD_USERS_SUCCESS;
    constructor(public payload: any) { }
}

export class AddUser implements Action {
    readonly type = ADD_USER;
    constructor(public payload: user) { }
}

export class AddUserSuccess implements Action {
    readonly type = ADD_USER_SUCCESS;
    constructor(public payload: user) { }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: any) { }
}

export class GetUser implements Action {
    readonly type = GET_USER;
    constructor(public payload: number) { }
}
 
export class GetUserSuccess implements Action {
    readonly type = GET_USER_SUCCESS;
    constructor(public payload: user) { }
}

export class UpdateUserSuccess implements Action {
    readonly type = UPDATE_USER_SUCCESS;
    constructor(public payload: user) { }
}

export class Redirect implements Action {
    readonly type = REDIRECT;    
}

export type Actions =  UpdateUser | AddUser | AddUserSuccess | LoadUsers  | LoadUsersSuccess | GetUser | GetUserSuccess | UpdateUserSuccess | Redirect | ServerError