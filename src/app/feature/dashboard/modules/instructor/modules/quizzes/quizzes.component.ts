 
import { Component, OnInit } from '@angular/core';
import { AddEditQuizComponent } from './components/add-edit-quiz/add-edit-quiz.component';
import { MatDialog } from '@angular/material/dialog';
import { QuizzesService } from './services/quizzes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../groups/services/groups.service';
import { ToastrService } from 'ngx-toastr';
import { IUpcomingCompleteQuizApiResponse } from "./interfaces/upcoming-completed-quiz.interface";

@Component({
  selector: "app-quizzes",
  templateUrl: "./quizzes.component.html",
  styleUrl: "./quizzes.component.scss",
})
 
 
export class QuizzesComponent implements OnInit{
  resMessage:string = '';
 upcomingQuizzes: IUpcomingCompleteQuizApiResponse[] = [];
  completedQuizzes: IUpcomingCompleteQuizApiResponse[] = [];
 headers: string[] = [
    "Title",
    "Status",
    "Close at",
    "Description",
    "Type",
    "Question no.",
    "Difficulty",
    "Duration",
  ];
  allGroups:any
  constructor(private dialog: MatDialog,private _quizzesService:QuizzesService,private _groupsService:GroupsService,private _toastrService:ToastrService){}
  ngOnInit(): void {
    this.getUpcomingQuizzes();
    this.getCompletedQuizzes();
  }
  openAddQuizDialog(): void {
    const dialogRef = this.dialog.open(AddEditQuizComponent, {
      // data: { groups: this.allGroups },
      width: "55%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        delete result.groups;
        this.addNewQuiz(result);
        console.log(result, "res");
      }
    });
  }
  addNewQuiz(data: any) {
    this._quizzesService.addQuiz(data).subscribe({
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
       
    });
  }
  getUpcomingQuizzes() {
    this._quizzesService.getUpcomingQuizzes().subscribe({
      next: (res) => {
        this.upcomingQuizzes = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCompletedQuizzes() {
    this._quizzesService.getCompletedQuizzes().subscribe({
      next: (res) => {
        this.completedQuizzes = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
