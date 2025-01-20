import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";
import { IResetPassword } from "../../interfaces/IResetPassword";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent {
  formType: string = "resetPassword";
  formTitle: string = "Forget Password";
  buttonName: string = "Send email";
  resMessage = "";
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _toastrService: ToastrService
  ) {}
  resetPassword(resetForm: FormGroup) {
    this._AuthService.forgetPassword(resetForm).subscribe({
      next: (res) => {
        this.resMessage = res.message;
      },

      complete: () => {
        this._toastrService.success(this.resMessage);
        this._Router.navigate([authRoutes.RESET_REQUEST_PASSWORD]);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
