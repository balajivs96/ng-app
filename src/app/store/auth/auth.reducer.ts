import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';


export const initialAuthState = {
    isAuthenticated: false,
    user: null
};

export const authReducer = createReducer(
    initialAuthState,

    on(AuthActions.loginSuccess, (state, { user }) => ({
        ...state,
        isAuthenticated: true,
        user
    })),

    on(AuthActions.logout, (state) => ({
        ...state,
        isAuthenticated: false,
        user: null
    }))
);