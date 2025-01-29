import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-code-quiz',
  templateUrl: './code-quiz.component.html',
  styleUrl: './code-quiz.component.scss'
})
export class CodeQuizComponent {
constructor(
    public dialogRef: MatDialogRef<CodeQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  {code:string},
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  copyInputMessage(inputElement:HTMLInputElement){
    inputElement.disabled = false
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    inputElement.disabled = true
  }
}
