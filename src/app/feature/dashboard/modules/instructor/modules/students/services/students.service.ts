import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  IAddUpdateStudentToGroup,
  IDeleteStudent,
  IStudent,
} from "../interfaces/student.interface";

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
  getStudentById(id: string): Observable<IStudent> {
    return this._HttpClient.get<IStudent>(`student/${id}`);
  }
  addStudentToGroup(
    studentId: string,
    groupId: string
  ): Observable<IAddUpdateStudentToGroup> {
    return this._HttpClient.get<IAddUpdateStudentToGroup>(
      `student/${studentId}/${groupId}`
    );
  }
  updateStudentGroup(
    studentId: string,
    groupId: string,
    newGroupId: string
  ): Observable<IAddUpdateStudentToGroup> {
    return this._HttpClient.put<IAddUpdateStudentToGroup>(
      `student/${studentId}/${groupId}`,
      newGroupId
    );
  }
  deleteStudent(id: string): Observable<IDeleteStudent> {
    return this._HttpClient.delete<IDeleteStudent>(`student/${id}`);
  }
  deleteStudentFromGroup(
    StudentId: string,
    groupId: string
  ): Observable<{ message: string }> {
    return this._HttpClient.delete<{ message: string }>(
      `student/${StudentId}/${groupId}`
    );
  }
}
