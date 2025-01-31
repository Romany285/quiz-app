import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { authRoutes } from "../../routes/auth-routes-enum";
import { authFormConfig } from "../auth-form-config/auth-form-config";

@Component({
  selector: "app-auth-dynamic-form",
  templateUrl: "./auth-dynamic-form.component.html",
  styleUrl: "./auth-dynamic-form.component.scss",
})
export class AuthDynamicFormComponent implements OnInit {
  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Input({ required: true }) formType: string = "";
  @Input({ required: true }) formTitle: string = "";
  @Input({ required: true }) buttonName: string = "";
  logoPath: string = "assets/images/svg/logo-white.svg";
  imagePath: string = "assets/images/svg/auth-image.svg";
  inputs: any[] = [];
  authForm: FormGroup = new FormGroup({});
  isLoggingIn: boolean = false;
  constructor() {}
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
          Validators.minLength(6),
        ]);
      } else {
        formGroup[input.control] = new FormControl("", Validators.required);
      }
    });
    this.authForm = new FormGroup(formGroup);
    if (localStorage.getItem("email")) {
      this.authForm.patchValue({ email: localStorage.getItem("email") });
    }
  }
  get authRoutes() {
    return authRoutes;
  }
  onSubmit() {
    this.isLoggingIn = true;
    this.formSubmit.emit(this.authForm);
  }
}
