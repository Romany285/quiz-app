import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  constructor(private _AuthService:AuthService,private _toastrService:ToastrService,private _router:Router){}
  formType: string = 'changePassword';
  resMessage = '';
  changePassword(data:any){
    this._AuthService.changePassword(data).subscribe({
      next: (res) => {
        this.resMessage = res.message;
      }, error: (err) => {
        console.log(err);
        this._toastrService.error(err.error.message, 'Error!')
      }, complete: () => {
        this._toastrService.success(this.resMessage);
        this._router.navigate(['/dashboard/home'])
      }
    })
  }
}
