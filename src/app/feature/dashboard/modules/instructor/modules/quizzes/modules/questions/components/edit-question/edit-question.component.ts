import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IGetQuestions } from '../../models/IGetQuestions';
import { QuestionsService } from '../../services/questions.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss'
})
export class EditQuestionComponent {

  form!: FormGroup;
  resMessage:string = ''
  currentQuestion:IGetQuestions;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionsService:QuestionsService,
    private _toastrService:ToastrService
  ) {
    this.currentQuestion = data
    console.log(this.currentQuestion)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      title: [this.currentQuestion.title, Validators.required],
      description: [this.currentQuestion.description, Validators.required],
      options: this.fb.group({
        A: [this.currentQuestion.options.A, Validators.required],
        B: [this.currentQuestion.options.B, Validators.required],
        C: [this.currentQuestion.options.C, Validators.required],
        D: [this.currentQuestion.options.D, Validators.required],
      }),
      answer: [this.currentQuestion.answer, Validators.required],
      difficulty: [this.currentQuestion.difficulty, Validators.required],
      type: [this.currentQuestion.type, Validators.required],
    });
  }
  onSubmit() {
    if (this.form.valid) {
        this._questionsService.updateQuestion(this.currentQuestion._id, this.form.value).subscribe({
          next:(res)=> {
            this.resMessage = res.message
          },
          error:(err)=> {
            this._toastrService.error(err.error.message)
            console.log(err);
          },
          complete:() => {
            this._toastrService.success(this.resMessage)
            this.onNoClick()
        },
      })
    }
  }
}
