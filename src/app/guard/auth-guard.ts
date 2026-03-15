import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { first, map, tap } from 'rxjs';
import { selectAuthState } from '../store/auth/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectAuthState).pipe(
    first(),
    tap(isAuth => {
      if (!isAuth.isAuthenticated) {
        router.navigate(['/login']);
      }
    }),
    map(isAuth => {
      return isAuth.isAuthenticated;
    })
  );
};