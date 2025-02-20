import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { GroupsService } from "../groups/services/groups.service";
import { AddEditQuizComponent } from "./components/add-edit-quiz/add-edit-quiz.component";
import { QuizzesService } from "./services/quizzes.service";

import { IUpcomingCompleteQuizApiResponse } from "../../../../../../shared/interfaces/upcoming-completed-quiz.interface";
import { CodeQuizComponent } from "./components/code-quiz/code-quiz.component";
import { IQuiz } from "./interfaces/quiz.interface";

@Component({
  selector: "app-quizzes",
  templateUrl: "./quizzes.component.html",
  styleUrl: "./quizzes.component.scss",
})
export class QuizzesComponent implements OnInit {
  resMessage: string = "";
  code: string = "";
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
  ];
  displayHeaders: { [key: string]: string } = {
    title: "Title",
    status: "Status",
    description: "Description",
    type: "Type",
    questions_number: "Question no.",
    difficulty: "Difficulty",
    duration: "Duration (min)",
  };
  allGroups: any;
  constructor(
    private dialog: MatDialog,
    private _quizzesService: QuizzesService,
    private _groupsService: GroupsService,
    private _toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getUpcomingQuizzes();
    this.getCompletedQuizzes();
    this.getAllGroups();
  }
  getAllGroups() {
    this._groupsService.getAllGroups().subscribe({
      next: (res) => {
        this.allGroups = res;
        console.log(res, "oooo");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openAddQuizDialog(): void {
    const dialogRef = this.dialog.open(AddEditQuizComponent, {
      data: { groups: this.allGroups },
      width: "60%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        delete result.groups;
        this.addNewQuiz(result);
        console.log(result, "res");
      }
    });
  }
  addNewQuiz(data: IQuiz) {
    this._quizzesService.addQuiz(data).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        this.code = res.data.code;
        console.log(res.data.code, "code");
      },
      error: (err) => {
        this._toastrService.error(err.error.message);
        console.log(err);
      },
      complete: () => {
        this._toastrService.success(this.resMessage);
        this.openCodeDialog(this.code);
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
  openCodeDialog(code: string): void {
    const dialogRef = this.dialog.open(CodeQuizComponent, {
      data: { code: code },
      width: "30%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result, "res");
      }
    });
  }
}
