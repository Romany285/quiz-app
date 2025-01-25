import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../../../shared/shared.module";
import { AddEditQuizComponent } from "./components/add-edit-quiz/add-edit-quiz.component";
import { QuizzesListComponent } from "./components/quizzes-list/quizzes-list.component";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { QuizzesComponent } from "./quizzes.component";

@NgModule({
  declarations: [QuizzesComponent, AddEditQuizComponent, QuizzesListComponent],
  imports: [CommonModule, QuizzesRoutingModule, SharedModule],
})
export class QuizzesModule {}
