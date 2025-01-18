import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetRequestPasswordComponent } from './components/reset-request-password/reset-request-password.component';

const routes: Routes = [
  {
    path: 'reset-request-password',
    component: ResetRequestPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
