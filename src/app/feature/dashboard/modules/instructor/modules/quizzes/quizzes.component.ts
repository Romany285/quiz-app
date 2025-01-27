import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { IUpcomingCompleteQuizApiResponse } from "../../../../../../shared/interfaces/upcoming-completed-quiz.interface";
import { GroupsService } from "../groups/services/groups.service";
import { AddEditQuizComponent } from "./components/add-edit-quiz/add-edit-quiz.component";
import { QuizzesService } from "./services/quizzes.service";

@Component({
  selector: "app-quizzes",
  templateUrl: "./quizzes.component.html",
  styleUrl: "./quizzes.component.scss",
})
export class QuizzesComponent implements OnInit {
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
  constructor(
    private dialog: MatDialog,
    private _quizzesService: QuizzesService,
    private _groupsService: GroupsService
  ) {}
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
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
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
