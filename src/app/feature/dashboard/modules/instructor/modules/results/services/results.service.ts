import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResult } from '../models/IResult';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private _httpClient:HttpClient) { }

  getAllResults():Observable<IResult[]>{
    return this._httpClient.get<IResult[]>('quiz/result')
  }
}
