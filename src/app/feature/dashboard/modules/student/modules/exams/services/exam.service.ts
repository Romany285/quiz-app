import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUpcomingCompleteQuizApiResponse } from "../../../../../../../shared/interfaces/upcoming-completed-quiz.interface";
import { IAnswer } from "../interfaces/answer.interface";
import { ISubmitAnswerApiResponse } from "../interfaces/submit-answer-response.interface";

@Injectable({
  providedIn: "root",
})
export class ExamService {
  constructor(private _HttpClient: HttpClient) {}

  getQuestionWithNoAnswer(
    quizId: string
  ): Observable<IUpcomingCompleteQuizApiResponse> {
    return this._HttpClient.get<IUpcomingCompleteQuizApiResponse>(
      `quiz/without-answers/${quizId}`
    );
  }
  submitAnswer(
    quizId: string,
    data: IAnswer
  ): Observable<ISubmitAnswerApiResponse> {
    return this._HttpClient.post<ISubmitAnswerApiResponse>(
      `quiz/submit/${quizId}`,
      data
    );
  }
}
