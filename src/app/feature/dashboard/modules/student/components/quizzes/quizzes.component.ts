import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { IUpcomingCompleteQuizApiResponse } from "../../../../../../shared/interfaces/upcoming-completed-quiz.interface";
import { QuizzesService } from "../../services/quizzes.service";
import { JoinCodeComponent } from "../join-code/join-code.component";

@Component({
  selector: "app-quizzes",
  templateUrl: "./quizzes.component.html",
  styleUrl: "./quizzes.component.scss",
})
export class QuizzesComponent {
  upcomingQuizzes: IUpcomingCompleteQuizApiResponse[] = [];
  completedQuizzes: IUpcomingCompleteQuizApiResponse[] = [];
  tableHeaders: string[] = [
    "title",
    "status",
    "description",
    "type",
    "questions_number",
    "difficulty",
    "duration",
    "closed_at",
  ];
  displayHeaders: { [key: string]: string } = {
    title: "Title",
    status: "Status",
    description: "Description",
    type: "Type",
    questions_number: "Question no.",
    difficulty: "Difficulty",
    duration: "Duration (min)",
    closed_at: "Closed at",
  };

  constructor(
    private dialog: MatDialog,
    private _quizzesService: QuizzesService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.getUpcomingQuizzes();
    this.getCompletedQuizzes();
  }
  openJoinCodeDialog(): void {
    const dialogRef = this.dialog.open(JoinCodeComponent, {
      data: {},
      width: "38%",
    });
    dialogRef.afterClosed().subscribe((result) => {});
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
