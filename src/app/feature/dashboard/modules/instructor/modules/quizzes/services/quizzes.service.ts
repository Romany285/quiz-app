import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IQuiz, IQuizApiInterface } from "../interfaces/quiz.interface";
import { IUpcomingCompleteQuizApiResponse } from "../interfaces/upcoming-completed-quiz.interface";

@Injectable({
  providedIn: "root",
})
export class QuizzesService {
  constructor(private _httpClient: HttpClient) {}
  addQuiz(data: IQuiz): Observable<IQuizApiInterface> {
    return this._httpClient.post<IQuizApiInterface>("quiz", data);
  }
  updateQuiz(data: any): Observable<any> {
    return this._httpClient.put("quiz", data);
  }
  deleteQuiz(id: string): Observable<any> {
    return this._httpClient.delete(`quiz/${id}`);
  }
  getUpcomingQuizzes(): Observable<IUpcomingCompleteQuizApiResponse[]> {
    return this._httpClient.get<IUpcomingCompleteQuizApiResponse[]>(
      "quiz/incomming"
    );
  }
  getCompletedQuizzes(): Observable<IUpcomingCompleteQuizApiResponse[]> {
    return this._httpClient.get<IUpcomingCompleteQuizApiResponse[]>(
      "quiz/completed"
    );
  }
  getAllQuizzes(): Observable<IQuiz[]> {
    return this._httpClient.get<IQuiz[]>("quiz");
  }
  getQuizById(code:any): Observable<any> {
    return this._httpClient.get(`/api/quiz`,code);
  }
}
