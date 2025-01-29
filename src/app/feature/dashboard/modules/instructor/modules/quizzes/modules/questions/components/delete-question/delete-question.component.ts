import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IGetQuestions } from '../../models/IGetQuestions';
import { QuestionsService } from '../../services/questions.service';
import { QuestionsComponent } from '../../questions.component';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrl: './delete-question.component.scss'
})
export class DeleteQuestionComponent {


  form!: FormGroup;
  resMessage:string = ''
  currentQuestion:IGetQuestions;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeleteQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _questionsService:QuestionsService,
    private _toastrService:ToastrService,
  ) {
    this.currentQuestion = data
    console.log(this.currentQuestion)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getAllQuestions(){
    this._questionsService.getAllQuestions().subscribe({
      next: (res) => {
        // this.allQuestions = res
        // console.log(res)
      },
      error: (err) => {
        // console.log(err)
      },
    })
  }
  onSubmit() {
    this._questionsService.deleteQuestion(this.currentQuestion._id).subscribe({
      next:(res)=> {
        this.resMessage = res.message
        this.onNoClick()
        this.getAllQuestions()
      },
      error:(err)=> {
        this._toastrService.error(err.error.message)
        console.log(err);
      },
      complete:() => {
        this._toastrService.success(this.resMessage)
      },
    })
  }
}

