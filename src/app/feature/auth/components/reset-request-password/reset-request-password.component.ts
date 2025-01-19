import { Component } from "@angular/core";

@Component({
  selector: "app-reset-request-password",
  templateUrl: "./reset-request-password.component.html",
  styleUrl: "./reset-request-password.component.scss",
})
export class ResetRequestPasswordComponent {
  formType: string = "resetRequestPassword";
  formTitle: string = "Reset Password";
  buttonName: string = "Reset";
}
