import {Action } from '@ngrx/store'
import * as UserActions from './user.actions'
import { user } from '../model'
import { page } from '../../shared'

export interface UsersListState {
    data: user[];
    totalRecords: number;
}
export const initialListState: UsersListState = {
    data: [],
    totalRecords: 0
    
};

export interface UserState {
    data: user; 
    updated:boolean;
    error:boolean;  
} 

export const initialUserState: UserState = {
    data: null,
    updated: false,
    error:false
    
};

export function usersListReducer(state: UsersListState = initialListState,action: UserActions.Actions) : UsersListState {
    switch(action.type){
        case UserActions.LOAD_USERS_SUCCESS:
            let result = action.payload;
            return {
                ...state,
                data:result.list,
                totalRecords: result.totalRecords          
            };
        case UserActions.REDIRECT:            
            return initialListState;
       default:
            return state;
    }
}

export function userReducer(state: UserState = initialUserState,action: UserActions.Actions) : UserState {
    switch(action.type){
        case UserActions.GET_USER_SUCCESS:            
            return {              
                data: action.payload,
                updated: false,
                error:false 
            };
       case UserActions.UPDATE_USER_SUCCESS:            
            return {
                data: action.payload,
                updated: true  ,
                error:false
            };
        case UserActions.ADD_USER_SUCCESS:            
        return {
            data: action.payload,
            updated: true ,
            error:false 
        };
        case UserActions.SERVER_ERROR:
            return {
                data:null,
                error:true,
                updated:false
            };
       case UserActions.REDIRECT:            
            return initialUserState;
       default:
            return state;
    }
}