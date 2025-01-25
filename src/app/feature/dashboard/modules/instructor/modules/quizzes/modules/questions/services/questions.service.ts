import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGetQuestions } from '../models/IGetQuestions';
import { IQuestion } from '../models/IQuestion';
import { IUpdateQuestion } from '../models/IUpdateQuestion';
import { ICreateAndDeleteQuestion } from '../models/ICreateAndDeleteQuestion';


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private _httpClient:HttpClient) { }
  getAllQuestions():Observable<IGetQuestions[]>{
    return this._httpClient.get<IGetQuestions[]>('question')
  }
  addNewQuestion(result:IQuestion): Observable<ICreateAndDeleteQuestion>{
    return this._httpClient.post<ICreateAndDeleteQuestion>('question', result)
  }
  updateQuestion(id:string, result:object): Observable<IUpdateQuestion>{
    return this._httpClient.put<IUpdateQuestion>('question/' + id, result)
  }
  deleteQuestion(id:string): Observable<ICreateAndDeleteQuestion>{
    return this._httpClient.delete<ICreateAndDeleteQuestion>('question/' + id)
  }
  
}
