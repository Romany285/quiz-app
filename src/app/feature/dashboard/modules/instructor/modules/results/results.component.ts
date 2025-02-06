import { Component } from "@angular/core";
import { Quiz } from "./models/IResult";
import { ResultsService } from "./services/results.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.scss",
})
export class ResultsComponent {
  results: any[] = [];
  tableHeaders: string[] = [
    "title",
    "type",
    "duration",
    "difficulty",
    "createdAt",
    "updatedAt",
  ];
  displayHeaders: { [key: string]: string } = {
    title: "Title",
    type: "Type",
    duration: "Duration (min)",
    difficulty: "Difficulty",
    createdAt: "Created at",
    updatedAt: "Updated at",
  };

  constructor(private _resultsService: ResultsService) {
    this.getResults();
  }
  getResults() {
    this._resultsService.getAllResults().subscribe({
      next: (res) => {
        this.results = res.map((item) => {
          return {
            type: item.quiz.type,

            createdAt: item.quiz.createdAt,
            updatedAt: item.quiz.updatedAt,
            title: item.quiz.title,
            duration: item.quiz.duration,
            difficulty: item.quiz.difficulty,
          };
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  viewQuiz(res: Quiz) {
    console.log(res);
  }
}
