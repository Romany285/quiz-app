import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { authRoutes } from "../../routes/auth-routes-enum";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  formType: string = "login";
  formTitle: string = "Create your account and start using QuizWiz!";
  buttonName: string = "Sign In";
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  login(formValue: FormGroup) {
    this._AuthService.login(formValue.value).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem(
          "name",
          res.data.profile.first_name + " " + res.data.profile.last_name
        );
        this._AuthService.getProfile();
      },
      complete: () => {
        this._Router.navigate(["/dashboard"]);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
