import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { IButtonConfig } from "../../../../../../shared/interfaces/button-config.interface";
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
  // headers: string[] = [
  //   "Title",
  //   "Status",
  //   "Description",
  //   "Type",
  //   "Question no.",
  //   "Difficulty",
  //   "Duration",
  // ];
  // upcomingHeaders = this.headers;
  // completedHeaders = this.headers.concat(["Closed at"]);

  tableHeaders: string[] = [
    "title",
    "status",
    "description",
    "type",
    "questions_number",
    "difficulty",
    "duration",
    "actions",
  ];
  displayHeaders: { [key: string]: string } = {
    title: "Title",
    status: "Status",
    description: "Description",
    type: "Type",
    questions_number: "Question no.",
    difficulty: "Difficulty",
    duration: "Duration",
    actions: "Actions",
  };
  buttons: IButtonConfig[] = [
    {
      btnIcon: "fa-solid fa-pen-to-square",
      action: (row) => this.updateFunction(row),
      class: "yellow-color",
    },
    {
      btnIcon: "fa-solid fa-trash",
      action: (row) => this.deleteFunction(row),
      class: "yellow-color",
    },
    {
      btnIcon: "fa-solid fa-eye",
      action: (row) => this.viewFunction(row),
      class: "yellow-color",
    },
  ];
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
  updateFunction(row: IUpcomingCompleteQuizApiResponse): void {
    // Logic for updating a quiz
  }

  deleteFunction(row: IUpcomingCompleteQuizApiResponse): void {
    // Logic for deleting a quiz
  }

  viewFunction(row: IUpcomingCompleteQuizApiResponse): void {
    // Logic for viewing a quiz
  }
}
