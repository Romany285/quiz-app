import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { Observable } from "rxjs";
import { IAuthRes, ILoginApiResponse } from "../interfaces/IAuthRes";
import { IChangePassword } from "../interfaces/IChangePassword";
import { ILogin } from "../interfaces/ILogin";
import { IRegister } from "../interfaces/IRegister";
import { IRequestResetPassword } from "../interfaces/IRequestResetPassword";
import { IResetPassword } from "../interfaces/IResetPassword";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  role: string | null = "";

  constructor(private _httpClient: HttpClient) {
    if (localStorage.getItem("token") !== null) this.getProfile();
  }
  getProfile() {
    let token: any = localStorage.getItem("token");
    let decode: any = jwtDecode(token);
    localStorage.setItem("role", decode.role);
    localStorage.setItem("email", decode.email);
    this.getRole();
  }
  getRole() {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("role") !== null
    ) {
      this.role = localStorage.getItem("role");
    }
  }

  login(data: ILogin): Observable<ILoginApiResponse> {
    return this._httpClient.post<ILoginApiResponse>("auth/login", data);
  }
  register(data: IRegister): Observable<IAuthRes> {
    return this._httpClient.post<IAuthRes>("auth/register", data);
  }
  forgetPassword(data: IResetPassword): Observable<IAuthRes> {
    return this._httpClient.post<IAuthRes>("auth/forgot-password", data);
  }
  resetPassword(data: IRequestResetPassword): Observable<IAuthRes> {
    return this._httpClient.post<IAuthRes>("auth/reset-password", data);
  }
  changePassword(data: IChangePassword): Observable<IAuthRes> {
    return this._httpClient.post<IAuthRes>("auth/change-password", data);
  }
  logout(): Observable<any> {
    return this._httpClient.get("auth/logout");
  }
}
