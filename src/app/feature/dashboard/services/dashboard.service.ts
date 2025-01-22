import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _httpClient:HttpClient) { }
  
  getTopFiveQuizzes(){
    return this._httpClient.get('quiz/incomming')
  } 


}
