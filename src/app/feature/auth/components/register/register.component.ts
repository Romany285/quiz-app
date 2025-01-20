import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { authRoutes } from '../../routes/auth-routes-enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
 formType: string = "register";
  formTitle: string = "Continue your learning journey with QuizWiz! ";
  buttonName: string = "Sign Up";
  resMessage = '';
  constructor(private _AuthService: AuthService, private _Router: Router,private _toastrService:ToastrService) {}
  register(registerForm: FormGroup) {
    this._AuthService.register(registerForm).subscribe({
      next: (res) => {
        this.resMessage = res.message;
        console.log(res)
      },
      error: (err) => {
        this._toastrService.error(err.error.message, 'Error!')
      },
      complete: () => {
        this._toastrService.success(this.resMessage);
        this._Router.navigate(['']);
      },
    });
  }
  get authRoutes() {
    return authRoutes;
  }
}
