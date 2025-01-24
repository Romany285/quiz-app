import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

constructor(private _httpClient:HttpClient) { }
  addQuiz(data: any): Observable<any> {
    return this._httpClient.post("quiz", data);
  }
  updateQuiz(data: any): Observable<any> {
    return this._httpClient.put("quiz", data);
  }
  deleteQuiz(id: string): Observable<any> {
    return this._httpClient.delete(`quiz/${id}`);
  }
  getUpcomingQuizzes(): Observable<any> {
    return this._httpClient.get("quiz/incomming");
  }
  getCompletedQuizzes(): Observable<any> {
    return this._httpClient.get("quiz/completed");
  }
}
