import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResultsService {
  constructor(private _httpClient: HttpClient) {}

  getAllResults(): Observable<any[]> {
    return this._httpClient.get<any[]>("quiz/result");
  }
}
