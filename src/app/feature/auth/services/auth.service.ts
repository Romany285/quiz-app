import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient:HttpClient) { }

  login(data:any): Observable<any>{
    return this._httpClient.post('auth/login', data)
  }
  register(data:any): Observable<any>{
    return this._httpClient.post('auth/register', data)
  }
  reqResetPassword(data:any): Observable<any>{
    return this._httpClient.post('auth/forgot-password', data)
  }
  reqPassword(data:any): Observable<any>{
    return this._httpClient.post('auth/reset-password', data)
  }
  changePassword(data:any): Observable<any>{
    return this._httpClient.post('auth/change-password', data)
  }
  logout(): Observable<any>{
    return this._httpClient.get('auth/login')
  }
}
