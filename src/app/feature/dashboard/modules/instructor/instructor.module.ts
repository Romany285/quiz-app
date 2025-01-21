import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../shared/shared.module";
import { InstructorRoutingModule } from "./instructor-routing.module";
import { InstructorComponent } from "./instructor.component";

@NgModule({
  declarations: [InstructorComponent],
  imports: [CommonModule, InstructorRoutingModule, SharedModule],
})
export class InstructorModule {}
