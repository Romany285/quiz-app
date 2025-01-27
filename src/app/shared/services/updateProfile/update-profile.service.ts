import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private _httpClient: HttpClient) {}

  updateProfile(data:object){
    return this._httpClient.put('instructor', data)
  }
}
