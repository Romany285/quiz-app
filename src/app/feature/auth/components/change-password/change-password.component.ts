import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {}
  formType: string = "changePassword";
  formTitle: string = "Change Password";
  buttonName: string = "Change";
  resMessage = "";
  changePassword(data: any) {
    this._AuthService.changePassword(data).subscribe({
      next: (res) => {
        this.resMessage = res.message;
      },
      complete: () => {
        this._toastrService.success(this.resMessage);
        this._router.navigate(["/dashboard/home"]);
      },
    });
  }
}
