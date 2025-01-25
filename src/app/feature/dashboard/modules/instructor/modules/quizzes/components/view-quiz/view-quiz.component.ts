import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { QuizzesService } from '../../services/quizzes.service';
import { DeleteItemComponent } from '../../../../components/delete-item/delete-item.component';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.scss'
})
export class ViewQuizComponent  {
  id:string='0B4399J'
  quizData:any;
   constructor(private _QuizzesService:QuizzesService, public dialog : MatDialog){}
  
   getQuizById(){
    this._QuizzesService.getQuizById(this.id).subscribe({
      next:(res)=>{
        console.log(res,'ww');
        this.quizData = res
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
   }
   
}
