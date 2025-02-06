import { Component, OnInit } from "@angular/core";
import { IResult } from "../../../instructor/modules/results/models/IResult";
import { ResultsService } from "../../../instructor/modules/results/services/results.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  tableHeaders: string[] = [
    "title",
    "score",
    "started_at",
    "finished_at",
    "duration",
    "difficulty",
  ];
  displayHeaders: { [key: string]: string } = {
    title: "Title",
    score: "Score",
    started_at: "Started At",
    finished_at: "Finished At",
    duration: "Duration (min)",
    difficulty: "Difficulty",
  };
  results: any[] = [];

  constructor(private _resultsService: ResultsService) {}

  ngOnInit() {
    this.getResults();
  }

  getResults() {
    this._resultsService.getAllResults().subscribe({
      next: (res: IResult[]) => {
        this.results = res.map((item: IResult) => {
          return {
            score: item.result.score,
            started_at: item.result.started_at,
            finished_at: item.result.finished_at,
            title: item.quiz.title,
            duration: item.quiz.duration,
            difficulty: item.quiz.difficulty,
          };
        });
        console.log("Flattened results:", this.results);
      },
      error: (err) => {
        console.log("Error:", err);
      },
    });
  }
}
