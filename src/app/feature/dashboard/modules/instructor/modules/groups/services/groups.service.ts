import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IGroup } from "../interfaces/IGroup";
import { IAddEdit, IAddEditRes } from "../interfaces/IAddEdit";
import { IDeleteGroup } from "../interfaces/IDeleteGroup";

@Injectable({
  providedIn: "root",
})
export class GroupsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllGroups(): Observable<IGroup[]> {
    return this._HttpClient.get<IGroup[]>("group");
  }
  addGroup(data: IAddEdit): Observable<IAddEditRes> {
    return this._HttpClient.post<IAddEditRes>("group", data);
  }
  updateGroup(
    id: string,
    data: IAddEdit
  ): Observable<IAddEditRes> {
    return this._HttpClient.put<IAddEditRes>(`group/${id}`, data);
  }
  deleteGroup(id: string): Observable<IDeleteGroup> {
    return this._HttpClient.delete<IDeleteGroup>(`group/${id}`);
  }
}
