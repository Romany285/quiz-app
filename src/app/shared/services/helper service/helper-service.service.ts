import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITopFiveStudents } from "../../../feature/dashboard/modules/instructor/modules/students/interfaces/student.interface";

@Injectable({
  providedIn: "root",
})
export class HelperServiceService {
  constructor(private _httpClient: HttpClient) {}
  getTopFiveStudents(): Observable<ITopFiveStudents> {
    return this._httpClient.get<ITopFiveStudents>("student/top-five");
  }
}
