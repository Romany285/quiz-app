import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UpdateProfileService } from './../../services/updateProfile/update-profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {
  form!:FormGroup
  resMessage:string = ''
  constructor(private fb:FormBuilder, 
    private _updateProfileService:UpdateProfileService, 
    private _toastrService:ToastrService,
    private _router:Router
  ){
    let full_name: any  = localStorage.getItem('name')?.split(' ');
    let first_name = full_name[0]
    let last_name = full_name.slice(1).join(' ');
    let email:string | null =  localStorage.getItem('email')

    this.form = this.fb.group({
      first_name : [first_name, [Validators.required]],
      last_name : [last_name, [Validators.required]],
      email : [email, [Validators.required]],
    })
  }
  onSubmit(data:object){
    this._updateProfileService.updateProfile(data).subscribe({
      next:(res:any)=> {
        this.resMessage = res.message
        console.log(res)
        localStorage.setItem('role', res.data.role)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('name', res.data.first_name + ' ' + res.data.last_name)
      },
      error:(err)=> {
        this._toastrService.error(err.error.message)
        console.log(err);
      },
      complete:() => {
        this._toastrService.success(this.resMessage)
    },
  })

  }
}
