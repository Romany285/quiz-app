import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IUpcomingCompleteQuizApiResponse } from "../../../../../../../../shared/interfaces/upcoming-completed-quiz.interface";
import { ISubmitAnswer } from "../../interfaces/submit-answer-response.interface";

@Component({
  selector: "app-submit-dialog",
  templateUrl: "./submit-dialog.component.html",
  styleUrl: "./submit-dialog.component.scss",
})
export class SubmitDialogComponent {
  total_score: number;
  formatted_time: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      data: ISubmitAnswer;
      quizData: IUpcomingCompleteQuizApiResponse;
    }
  ) {
    this.total_score =
      this.data.data.questions.length *
      Number(this.data.quizData.score_per_question);

    const timeInSeconds =
      (new Date(this.data.data.finished_at).getTime() -
        new Date(this.data.data.started_at).getTime()) /
      1000;

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    this.formatted_time = `${minutes}m ${seconds}s`;
  }
}
