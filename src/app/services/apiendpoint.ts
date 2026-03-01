import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Apiendpoint {
  private baseUrl = 'http://localhost:8080';

  http = inject(HttpClient);

  api = {
    registerUrl: this.baseUrl + '/auth/register',
    loginUrl: this.baseUrl + '/auth/login',
  };
  register(user: any): Observable<any> {
    return this.http.post<any>(this.api.registerUrl, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.api.loginUrl, credentials);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/users');
  }
}
