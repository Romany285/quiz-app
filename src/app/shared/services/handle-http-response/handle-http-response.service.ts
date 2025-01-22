import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class HandleHttpResponseService {
  constructor(private _Toastr: ToastrService) {}
  public handleResponse(res: HttpResponse<any>) {
    let resMsg: string = "";
    if (res.status === 200) {
      resMsg = res.body.message;
    } else if (res.status === 201) {
      resMsg = res.body.message || "Resource created successfully.";
    } else if (res.status === 202) {
      resMsg = res.body.message || "Request accepted.";
    } else {
      resMsg = res.body.message || `Success with status code: ${res.status}`;
    }
    this._Toastr.success(resMsg, "Success");
  }
}
