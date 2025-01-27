import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
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
  resMessage: string = "";
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
  addNewQuiz(data: any) {
    this._quizzesService.addQuiz(data).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        console.log(res);
      },
      error: (err) => {
        this._toastrService.error(err.error.message);
        console.log(err);
      },
      complete: () => {
        this._toastrService.success(this.resMessage);
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
