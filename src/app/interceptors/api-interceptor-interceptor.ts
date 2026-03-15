import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Apiendpoint } from '../services/apiendpoint';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private apiService = inject(Apiendpoint);
  private store = inject(Store);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      withCredentials: true
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
          // Attempt to refresh token
          return this.apiService.refreshToken().pipe(
            switchMap(() => {
              // Retry the original request after refresh
              return next.handle(clonedRequest);
            }),
            catchError(() => {
              // If refresh fails, logout user
              this.store.dispatch(AuthActions.logout());
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
