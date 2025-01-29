import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizzesService } from '../../services/quizzes.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-join-code',
  templateUrl: './join-code.component.html',
  styleUrl: './join-code.component.scss'
})
export class JoinCodeComponent {
  code:string = '';
constructor(
    public dialogRef: MatDialogRef<JoinCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  {code:string},
    private _quizzesService:QuizzesService,
    private _FormBuilder:FormBuilder
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  codeForm:FormGroup = this._FormBuilder.group({
    code:['']
  })
  handleForm(){
    const userData = this.codeForm.value
     
      this._quizzesService.sendCode(userData).subscribe({
        next:(res)=>{
         console.log(res);
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
}
