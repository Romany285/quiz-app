import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../../../shared/shared.module";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { QuizzesComponent } from "./quizzes.component";

@NgModule({
  declarations: [QuizzesComponent],
  imports: [CommonModule, QuizzesRoutingModule, SharedModule],
})
export class QuizzesModule {}
