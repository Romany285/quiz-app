import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DeleteItemComponent } from "../../../../components/delete-item/delete-item.component";
import { IQuiz } from "../../interfaces/quiz.interface";
import { QuizzesService } from "../../services/quizzes.service";
import { AddEditQuizComponent } from "../add-edit-quiz/add-edit-quiz.component";

@Component({
  selector: "app-view-quiz",
  templateUrl: "./view-quiz.component.html",
  styleUrl: "./view-quiz.component.scss",
})
export class ViewQuizComponent implements OnInit {
  id: string = "";
  quizData?: IQuiz;
  resMessage: string = "";
  quizId: string = "";

  constructor(
    private _QuizzesService: QuizzesService,
    private _router: Router,
    public dialog: MatDialog,
    private _ActivatedRoute: ActivatedRoute,
    private _toastrService: ToastrService
  ) {
    this.id = this._ActivatedRoute.snapshot.params["id"];
    this.getQuizById();
  }
  ngOnInit(): void {
    this.testQuizCloses();
  }
  getAllGroups() {}
  getQuizById() {
    this._QuizzesService.getQuizById(this.id).subscribe({
      next: (res) => {
        console.log(res, "ww");
        this.quizData = res;
        this.quizId = res._id;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openUpdateQuizDialog(quizData?: IQuiz): void {
    const dialogRef = this.dialog.open(AddEditQuizComponent, {
      data: quizData,
      width: "55%",
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        delete result._id;
        delete result.code;
        delete result.instructor;
        delete result.questions;
        delete result.updatedAt;
        delete result.createdAt;
        delete result.__v;

        this.UpdateQuiz(result);
        console.log(result, "res");
      }
    });
  }
  UpdateQuiz(data: IQuiz) {
    this._QuizzesService.updateQuiz(this.id, data).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        console.log(res);
      },
      error: (err) => {
        this._toastrService.error(err.error.message);
        console.log(err);
      },
      complete: () => {
        this.getQuizById();
        this._toastrService.success(this.resMessage);
      },
    });
  }
  openDeleteDialog(quiz?: IQuiz): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {
        title: "Quiz",
        description: `Are you sure you want to delete ${quiz?.title} quiz?`,
        id: quiz?._id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== null) {
        this.deleteQuiz(this.id);
      }
    });
  }
  private deleteQuiz(id: string) {
    this._QuizzesService.deleteQuiz(id).subscribe({
      next: (res) => {
        this.resMessage = res.message;
      },
      error: (err) => {
        this._toastrService.error(err.error.message);
      },
      complete: () => {
        this._toastrService.success(this.resMessage);
        this._router.navigate(["/dashboard/quizzes/quizzes-list"]);
      },
    });
  }
  testQuizCloses() {
    const now = new Date();
    let currentTime = now.toLocaleTimeString();
    if (this.quizData?.schadule! > currentTime) {
      return true;
    } else {
      return false;
    }
  }
}
