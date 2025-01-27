import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";

@NgModule({
  declarations: [StudentComponent],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {}
