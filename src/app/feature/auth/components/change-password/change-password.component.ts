import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent {
  constructor(private _AuthService: AuthService, private _router: Router) {}
  formType: string = "changePassword";
  formTitle: string = "Change Password";
  buttonName: string = "Change";
  changePassword(formValue: FormGroup) {
    this._AuthService.changePassword(formValue.value).subscribe({
      complete: () => {
        this._router.navigate(["/auth"]);
        localStorage.clear();
      },
    });
  }
}
