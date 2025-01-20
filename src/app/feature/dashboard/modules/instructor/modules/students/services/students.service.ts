import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IStudent } from "../interfaces/student.interface";

@Injectable({
  providedIn: "root",
})
export class StudentsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllStudents(): Observable<IStudent[]> {
    return this._HttpClient.get<IStudent[]>("student");
  }
  getAllWithoutGroup(): Observable<IStudent[]> {
    return this._HttpClient.get<IStudent[]>("student/without-group");
  }
}
