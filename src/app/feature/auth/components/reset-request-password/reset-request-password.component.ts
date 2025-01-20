import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { IRequestResetPassword } from "../../interfaces/IRequestResetPassword";

@Component({
  selector: "app-reset-request-password",
  templateUrl: "./reset-request-password.component.html",
  styleUrl: "./reset-request-password.component.scss",
})
export class ResetRequestPasswordComponent {
  formType: string = "resetRequestPassword";
  formTitle: string = "Reset Password";
  buttonName: string = "Reset";
  resMessage = '';
  constructor(private _AuthService: AuthService, private _Router: Router,private _toastrService:ToastrService) {}
  resetReqPassword(resetForm: IRequestResetPassword) {
    this._AuthService.resetPassword(resetForm).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        console.log(res);
      },
      error: (err) => {
        this._toastrService.error(err.error.message, 'Error!')
      },
      complete: () => {
        this._toastrService.success(this.resMessage);
        this._Router.navigate([authRoutes.LOGIN]);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
