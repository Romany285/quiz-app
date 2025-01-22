import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

constructor(private _HttpClient:HttpClient) { }
  getAllGroups():Observable<any>{
    return this._HttpClient.get('group')
  }
  addGroup(data:any):Observable<any>{
    return this._HttpClient.post('group',data)
  }
  updateGroup(id:string,data:any):Observable<any>{
    return this._HttpClient.post(`group${id}`,data)
  }
}
