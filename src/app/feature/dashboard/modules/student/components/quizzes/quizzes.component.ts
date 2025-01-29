import { Component } from '@angular/core';
import { JoinCodeComponent } from '../join-code/join-code.component';
import { MatDialog } from '@angular/material/dialog';
import { IUpcomingCompleteQuizApiResponse } from '../../../../../../shared/interfaces/upcoming-completed-quiz.interface';
import { QuizzesService } from '../../services/quizzes.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.scss'
})
export class QuizzesComponent {
  upcomingQuizzes: IUpcomingCompleteQuizApiResponse[] = [];
  completedQuizzes: IUpcomingCompleteQuizApiResponse[] = [];
  headers: string[] = [
    "Title",
    "Status",
    "Description",
    "Type",
    "Question no.",
    "Difficulty",
    "Duration",
  ];
  upcomingHeaders = this.headers;
  completedHeaders = this.headers.concat(["Closed at"]);
  constructor(private dialog: MatDialog,private _quizzesService:QuizzesService) {}
  ngOnInit(): void {
    this.getUpcomingQuizzes();
    this.getCompletedQuizzes();
    
  }
  openJoinCodeDialog():void{
    const dialogRef = this.dialog.open(JoinCodeComponent, {
      data: {},
      width: "38%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
         
        console.log(result, "res");
      }
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
