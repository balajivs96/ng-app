import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { AuthState } from './auth.state';

export const selectAuthState =
  createFeatureSelector<any>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);