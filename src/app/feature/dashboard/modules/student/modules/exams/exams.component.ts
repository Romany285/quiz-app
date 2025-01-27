import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-exams",
  templateUrl: "./exams.component.html",
  styleUrl: "./exams.component.scss",
})
export class ExamsComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ["", Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ["", Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}
