import { User } from "@angular/fire/auth";
import { createAction, props } from "@ngrx/store";




export const login = createAction('[Auth] Login');
export const loginSuccess = createAction( '[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction( '[Auth] Login Failure', props<{ error: string }>());



export const logout = createAction( '[Auth] Logout');
export const logoutSuccess = createAction( '[Auth] Logout Success');
export const logoutFailure = createAction( '[Auth] Logout Failure', props<{ error: string }>());
