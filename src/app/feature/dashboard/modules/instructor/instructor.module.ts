import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddEditViewComponent } from './components/add-edit-view/add-edit-view.component';


@NgModule({
  declarations: [
    InstructorComponent,
    AddEditViewComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,SharedModule
  ]
})
export class InstructorModule { }
