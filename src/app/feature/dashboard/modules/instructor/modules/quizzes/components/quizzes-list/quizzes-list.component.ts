import { Component, OnInit } from "@angular/core";
import { IQuiz } from "../../interfaces/quiz.interface";
import { QuizzesService } from "../../services/quizzes.service";

@Component({
  selector: "app-quizzes-list",
  templateUrl: "./quizzes-list.component.html",
  styleUrl: "./quizzes-list.component.scss",
})
export class QuizzesListComponent implements OnInit {
  quizzesList: IQuiz[] | undefined = [];
  headers: string[] = [
    "Title",
    "Code",
    "Status",
    "Description",
    "Type",
    "Question no.",
    "Difficulty",
    "Duration",
    "Action",
  ];
  constructor(private _QuizzesService: QuizzesService) {}
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
}
