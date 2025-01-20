import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-reset-request-password",
  templateUrl: "./reset-request-password.component.html",
  styleUrl: "./reset-request-password.component.scss",
})
export class ResetRequestPasswordComponent {
  formType: string = "resetRequestPassword";
  formTitle: string = "Reset Password";
  buttonName: string = "Reset";
  resMessage = "";
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _toastrService: ToastrService
  ) {}
  resetReqPassword(resetForm: FormGroup) {
    this._AuthService.resetPassword(resetForm).subscribe({
      next: (res) => {
        this.resMessage = res.message;
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
