import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { authRoutes } from '../../routes/auth-routes-enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 formType: string = "register";
  formTitle: string = "Continue your learning journey with QuizWiz! ";
  buttonName: string = "Sign Up";
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  register(registerForm: FormGroup) {
    this._AuthService.forgetPassword(registerForm).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
      complete: () => {
        this._Router.navigate(['']);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
