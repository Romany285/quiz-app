import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IGroup } from "../interfaces/IGroup";
import { IAddEdit } from "../interfaces/IAddEdit";

@Injectable({
  providedIn: "root",
})
export class GroupsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllGroups(): Observable<IGroup[]> {
    return this._HttpClient.get<IGroup[]>("group");
  }
  addGroup(data: IAddEdit): Observable<any> {
    return this._HttpClient.post("group", data);
  }
  updateGroup(
    id: string,
    data: {
      name: string;
      students: string[];
    }
  ): Observable<any> {
    return this._HttpClient.put(`group/${id}`, data);
  }
  deleteGroup(id: string): Observable<any> {
    return this._HttpClient.delete(`group/${id}`);
  }
}
