import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUpcomingCompleteQuizApiResponse } from '../../../../../shared/interfaces/upcoming-completed-quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

constructor(private _httpClient:HttpClient) { }
  sendCode(code:string):Observable<any>{
    return this._httpClient.post(`quiz/join`,code)
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
}
