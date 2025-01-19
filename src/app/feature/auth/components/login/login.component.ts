import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { authRoutes } from '../../routes/auth-routes-enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formType: string = "login";
  formTitle: string = "Create your account and start using QuizWiz!";
  buttonName: string = "Sign In";
  resMessage = '';
  constructor(private _AuthService: AuthService, private _Router: Router,private _toastrService:ToastrService) {}
  login(loginForm: FormGroup) {
    this._AuthService.login(loginForm).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        console.log(res);
      },
      error: (err) => {
        this._toastrService.error(err.error.message, 'Error!')
      },
      complete: () => {
        this._toastrService.success(this.resMessage);
        this._Router.navigate(['/dashboard']);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
