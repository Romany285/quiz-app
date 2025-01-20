import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent {
  formType: string = "resetPassword";
  formTitle: string = "Forget Password";
  buttonName: string = "Send email";
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  resetPassword(formValue: FormGroup) {
    this._AuthService.forgetPassword(formValue.value).subscribe({
      next: (res) => {
        localStorage.setItem("email", formValue.get("email")?.value);
      },
      complete: () => {
        this._Router.navigate([authRoutes.RESET_REQUEST_PASSWORD]);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
