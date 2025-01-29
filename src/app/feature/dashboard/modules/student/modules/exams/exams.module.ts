import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../../../shared/shared.module";
import { ExamsRoutingModule } from "./exams-routing.module";
import { ExamsComponent } from "./exams.component";
import { SubmitDialogComponent } from './components/submit-dialog/submit-dialog.component';

@NgModule({
  declarations: [ExamsComponent, SubmitDialogComponent],
  imports: [CommonModule, ExamsRoutingModule, SharedModule],
})
export class ExamsModule {}
