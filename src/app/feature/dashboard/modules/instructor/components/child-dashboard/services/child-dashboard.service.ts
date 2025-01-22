import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITopFiveStudents } from '../models/ITopFiveStudents';

@Injectable({
  providedIn: 'root'
})
export class ChildDashboardService {

  constructor(private _httpClient:HttpClient) { }

  topFiveStudents():Observable<ITopFiveStudents>{
    return this._httpClient.get<ITopFiveStudents>('student/top-five')
  }
}
