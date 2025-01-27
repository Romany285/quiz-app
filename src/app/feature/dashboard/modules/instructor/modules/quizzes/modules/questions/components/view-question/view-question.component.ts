import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestionsService } from '../../services/questions.service';
import { ToastrService } from 'ngx-toastr';
import { IQuestion } from '../../models/IQuestion';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss'
})
export class ViewQuestionComponent {

  resMessage:string = ''
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ViewQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IQuestion,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
