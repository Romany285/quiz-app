import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class HandleErrorService {
  constructor(private _Toastr: ToastrService) {}
  public handleError(err: HttpErrorResponse) {
    let resMsg: string = "";
    if (err.error instanceof ErrorEvent) {
      resMsg = err.error.message;
    } else {
      resMsg = `${err.error.message}`;
    }
    this._Toastr.error(resMsg, "Error");
  }
}
