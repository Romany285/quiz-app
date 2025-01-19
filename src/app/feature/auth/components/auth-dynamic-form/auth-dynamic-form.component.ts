import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { authRoutes } from "../../routes/auth-routes-enum";
import { authFormConfig } from "../auth-form-config/auth-form-config";

@Component({
  selector: "app-auth-dynamic-form",
  templateUrl: "./auth-dynamic-form.component.html",
  styleUrl: "./auth-dynamic-form.component.scss",
})
export class AuthDynamicFormComponent implements OnInit {
  @Input({ required: true }) formType: string = "";
  @Input({ required: true }) formTitle: string = "";
  @Input({ required: true }) buttonName: string = "";
  logoPath: string = "assets/images/svg/logo-white.svg";
  imagePath: string = "assets/images/svg/auth-image.svg";
  inputs: any[] = [];
  authForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.inputs = authFormConfig[this.formType];
    const formGroup: any = {};
    this.inputs.forEach((input) => {
      if (input.type === "email") {
        formGroup[input.control] = new FormControl("", [
          Validators.required,
          Validators.email,
        ]);
      } else if (input.type === "password") {
        formGroup[input.control] = new FormControl("", [
          Validators.required,
          Validators.pattern(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
          ),
        ]);
      } else {
        formGroup[input.control] = new FormControl("", Validators.required);
      }
    });
    this.authForm = new FormGroup(formGroup);
  }
  get authRoutes() {
    return authRoutes;
  }
}
