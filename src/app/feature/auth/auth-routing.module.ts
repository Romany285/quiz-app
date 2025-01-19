import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetRequestPasswordComponent } from './components/reset-request-password/reset-request-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
  {
    path: "request-reset-password",
    component: ResetRequestPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
