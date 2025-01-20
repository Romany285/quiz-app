import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  formType: string = "register";
  formTitle: string = "Continue your learning journey with QuizWiz! ";
  buttonName: string = "Sign Up";
  resMessage = "";
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _toastrService: ToastrService
  ) {}
  register(registerForm: FormGroup) {
    this._AuthService.forgetPassword(registerForm).subscribe({
      next: (res) => {
        this.resMessage = res.message;
      },

      complete: () => {
        this._toastrService.success(this.resMessage);
        this._Router.navigate([""]);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
