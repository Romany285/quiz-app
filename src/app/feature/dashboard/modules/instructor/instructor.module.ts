import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from '../../../../shared/shared.module';
import { AddEditViewComponent } from './components/add-edit-view/add-edit-view.component';
import { ChildDashboardComponent } from './components/child-dashboard/child-dashboard.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';

@NgModule({
  declarations: [
    InstructorComponent,
    AddEditViewComponent,
    ChildDashboardComponent,
    DeleteItemComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,SharedModule
  ]
})
export class InstructorModule {}
