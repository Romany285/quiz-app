import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionsService } from '../../services/questions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss'
})
export class AddQuestionComponent {
  form!: FormGroup;
  resMessage:string = ''
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionsService:QuestionsService,
    private _toastrService:ToastrService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      options: this.fb.group({
        A: ['', Validators.required],
        B: ['', Validators.required],
        C: ['', Validators.required],
        D: ['', Validators.required],
      }),
      answer: ['', Validators.required],
      difficulty: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.form.valid) {
        this._questionsService.addNewQuestion(this.form.value).subscribe({
          next:(res)=>{
            this.resMessage = res.message
          },
          error:(err)=>{
            this._toastrService.error(err.error.message)
            console.log(err);
          },
          complete:() =>{
            this._toastrService.success(this.resMessage)
            this.onNoClick()
        },
      })
    }
  }
}
