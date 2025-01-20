import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { IAuthRes, IResLogin } from "../interfaces/IAuthRes";
import { IRegister } from "../interfaces/IRegister";
import { IRequestResetPassword } from "../interfaces/IRequestResetPassword";
import { IResetPassword } from "../interfaces/IResetPassword";
import { IChangePassword } from "../interfaces/IChangePassword";
import { ILogin } from "../interfaces/ILogin";
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
  
  login(data: ILogin) :Observable<IResLogin>{
    return this._httpClient.post<IResLogin>("auth/login", data);
  }
  register(data: IRegister) :Observable<IAuthRes>{
    return this._httpClient.post<IAuthRes>("auth/register", data);
  }
  forgetPassword(data: IResetPassword):Observable<IAuthRes>{
    return this._httpClient.post<IAuthRes>("auth/forgot-password", data);
  }
  resetPassword(data: IRequestResetPassword):Observable<IAuthRes> {
    return this._httpClient.post<IAuthRes>("auth/reset-password", data);
  }
  changePassword(data: IChangePassword):Observable<IAuthRes> {
    return this._httpClient.post<IAuthRes>("auth/change-password", data);
  }
  logout(): Observable<any> {
    return this._httpClient.get("auth/logout");
}
}
