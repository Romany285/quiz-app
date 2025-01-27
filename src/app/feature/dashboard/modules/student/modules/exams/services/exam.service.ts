import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUpcomingCompleteQuizApiResponse } from "../../../../../../../shared/interfaces/upcoming-completed-quiz.interface";
import { IAnswerSubmission } from "../interfaces/answer.interface";
import { ISubmitAnswerApiResponse } from "../interfaces/submit-answer-response.interface";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  constructor(private _HttpClient: HttpClient) {}

  getQuestionWithNoAnswer(
    quizId: string
  ): Observable<{ data: IUpcomingCompleteQuizApiResponse }> {
    return this._HttpClient.get<{ data: IUpcomingCompleteQuizApiResponse }>(
      `quiz/without-answers/${quizId}`
    );
  }
  submitAnswers(
    quizId: string,
    submissionData: IAnswerSubmission
  ): Observable<ISubmitAnswerApiResponse> {
    return this._HttpClient.post<ISubmitAnswerApiResponse>(
      `quiz/submit/${quizId}`,
      submissionData
    );
  }
}
