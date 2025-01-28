import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../../../shared/shared.module";
import { ExamsRoutingModule } from "./exams-routing.module";
import { ExamsComponent } from "./exams.component";

@NgModule({
  declarations: [ExamsComponent],
  imports: [CommonModule, ExamsRoutingModule, SharedModule],
})
export class ExamsModule {}
