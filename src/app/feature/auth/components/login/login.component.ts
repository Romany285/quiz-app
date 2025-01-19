import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { authRoutes } from '../../routes/auth-routes-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formType: string = "login";
  formTitle: string = "Create your account and start using QuizWiz!";
  buttonName: string = "Sign In";
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  login(loginForm: FormGroup) {
    this._AuthService.login(loginForm).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
      complete: () => {
        this._Router.navigate(['/dashboard']);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
