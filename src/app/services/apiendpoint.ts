import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Apiendpoint {
  private baseUrl = 'http://localhost:8080';

  http = inject(HttpClient);

  private accessToken: string | null = null;
  api = {
    registerUrl: this.baseUrl + '/auth/register',
    loginUrl: this.baseUrl + '/auth/login',
  };
  register(user: any): Observable<any> {
    return this.http.post<any>(this.api.registerUrl, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.api.loginUrl, credentials).pipe(
      tap(res => {
        if (res.token) {
          this.accessToken = res.token;
        }
      })
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/users');
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  refreshToken(): Observable<string> {
    return this.http.post<any>(this.baseUrl + '/auth/refresh-token',{}).pipe(
      tap(res => {
        this.accessToken = res.token;
      }),
      switchMap(res => of(res.token)),
      catchError(err => throwError(() => new Error('Could not refresh token')))
    );
  }
}
