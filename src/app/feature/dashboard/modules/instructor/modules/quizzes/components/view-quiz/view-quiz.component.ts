import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { QuizzesService } from '../../services/quizzes.service';
import { DeleteItemComponent } from '../../../../components/delete-item/delete-item.component';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IQuiz } from '../../interfaces/quiz.interface';
import { AddEditQuizComponent } from '../add-edit-quiz/add-edit-quiz.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.scss'
})
export class ViewQuizComponent  implements OnInit{
  id:string=''
  quizData?:IQuiz;
  resMessage:string = '';
   constructor(private _QuizzesService:QuizzesService, public dialog : MatDialog,private _ActivatedRoute:ActivatedRoute,private _toastrService:ToastrService){
    this.id =  this._ActivatedRoute.snapshot.params['id']
    this.getQuizById()
   }
  ngOnInit(): void {
  
  }
  getAllGroups(){

  }
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
    openUpdateQuizDialog(quizData?:IQuiz): void {
       const dialogRef = this.dialog.open(AddEditQuizComponent, {
         data: {quizData: quizData,},
         width: "55%",
       });
       dialogRef.afterClosed().subscribe((result) => {
         if (result) {
           delete result.groups;
           this.UpdateQuiz(result);
           console.log(result, "res");
         }
       });
     }
     UpdateQuiz(data: any) {
       this._QuizzesService.updateQuiz(data._id,data).subscribe({
         next:(res)=>{
           this.resMessage = res.message
           console.log(res);
         },
         error:(err)=>{
           this._toastrService.error(err.error.message)
           console.log(err);
         },complete:() =>{
           this._toastrService.success(this.resMessage)
         },
       })
          
     };
}
