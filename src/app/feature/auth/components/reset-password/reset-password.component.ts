import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent {
  formType: string = "resetPassword";
  formTitle: string = "Forget Password";
  buttonName: string = "Send email";
  resMessage = '';
  constructor(private _AuthService: AuthService, private _Router: Router,private _toastrService:ToastrService) {}
  resetPassword(resetForm: FormGroup) {
    this._AuthService.forgetPassword(resetForm).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        console.log(res);
      },
      error: (err) =>  {
        this._toastrService.error(err.error.message, 'Error!')
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
