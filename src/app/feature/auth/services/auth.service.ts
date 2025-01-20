import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  role:string | null = ''

  constructor(private _httpClient: HttpClient) {
  if(localStorage.getItem('userToken') !== null)
    this.getProfile()
  }
  getProfile(){
    let token:any = localStorage.getItem('token')
    let decode:any = jwtDecode(token)
    localStorage.setItem('role', decode.role)
    localStorage.setItem('name', decode.first_name)
    localStorage.setItem('email', decode.email)
    console.log(decode)
    this.getRole()
  }
  getRole(){
    if(localStorage.getItem('userToken') !== null && localStorage.getItem('role') !== null ){
      this.role = localStorage.getItem('role')
    }
  }
  login(data: any): Observable<any> {
    return this._httpClient.post("auth/login", data);
  }
  register(data: any): Observable<any> {
    return this._httpClient.post("auth/register", data);
  }
  forgetPassword(data: any): Observable<any> {
    return this._httpClient.post("auth/forgot-password", data);
  }
  resetPassword(data: any): Observable<any> {
    return this._httpClient.post("auth/reset-password", data);
  }
  changePassword(data: any): Observable<any> {
    return this._httpClient.post("auth/change-password", data);
  }
  logout(): Observable<any> {
    return this._httpClient.get("auth/logout");
  }
}
