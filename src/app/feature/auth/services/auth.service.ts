import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
  constructor(private _httpClient: HttpClient) {}

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
  logout() {
    return this._httpClient.get("auth/login");
  }
}
