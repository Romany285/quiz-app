import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IButtonConfig } from "../../../../../../../../shared/interfaces/button-config.interface";
import { IQuiz } from "../../interfaces/quiz.interface";
import { QuizzesService } from "../../services/quizzes.service";

@Component({
  selector: "app-quizzes-list",
  templateUrl: "./quizzes-list.component.html",
  styleUrl: "./quizzes-list.component.scss",
})
export class QuizzesListComponent implements OnInit {
  quizzesList: IQuiz[] = [];

  tableHeaders: string[] = [
    "title",
    "code",
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
    code: "Code",
    status: "Status",
    description: "Description",
    type: "Type",
    questions_number: "Question no.",
    difficulty: "Difficulty",
    duration: "Duration (min)",
    actions: "Actions",
  };
  buttons: IButtonConfig[] = [
    {
      btnIcon: "fa-solid fa-eye",
      action: (row) => this.viewQuiz(row._id),
      class: "orange-color",
    },
  ];

  constructor(
    private _QuizzesService: QuizzesService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.getAllQuizzes();
  }
  getAllQuizzes() {
    this._QuizzesService.getAllQuizzes().subscribe({
      next: (res) => {
        this.quizzesList = res;
      },
    });
  }
  viewQuiz(quizId: string) {
    this._Router.navigate(["/dashboard/quizzes/view", quizId]);
  }
}
