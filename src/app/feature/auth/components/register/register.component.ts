import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  formType: string = "register";
  formTitle: string = "Create your account and start using QuizWiz!";
  buttonName: string = "Sign Up";
  constructor(private _AuthService: AuthService, private _Router: Router) {
    localStorage.clear();
  }
  register(formValue: FormGroup) {
    this._AuthService.register(formValue.value).subscribe({
      complete: () => {
        this._Router.navigate([""]);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
