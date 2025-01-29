import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { QuizzesService } from "../../services/quizzes.service";

@Component({
  selector: "app-join-code",
  templateUrl: "./join-code.component.html",
  styleUrl: "./join-code.component.scss",
})
export class JoinCodeComponent {
  code: string = "";
  id: string = "";
  constructor(
    public dialogRef: MatDialogRef<JoinCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { code: string },
    private _quizzesService: QuizzesService,
    private _FormBuilder: FormBuilder,
    private _Router: Router
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  codeForm: FormGroup = this._FormBuilder.group({
    code: [""],
  });
  handleForm() {
    const userData = this.codeForm.value;

    this._quizzesService.sendCode(userData).subscribe({
      next: (res) => {
        console.log(res);
        this.id = res.data.quiz;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this._Router.navigate(["/dashboard/student/exams/quiz/" + this.id]);
      },
    });
  }
}
