import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../../../shared/shared.module";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { QuizzesComponent } from "./quizzes.component";
import { QuizzesListComponent } from './components/quizzes-list/quizzes-list.component';

@NgModule({
  declarations: [QuizzesComponent, QuizzesListComponent],
  imports: [CommonModule, QuizzesRoutingModule, SharedModule],
})
export class QuizzesModule {}
