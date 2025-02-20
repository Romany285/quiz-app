import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../../../shared/shared.module";
import { AddEditQuizComponent } from "./components/add-edit-quiz/add-edit-quiz.component";
import { CodeQuizComponent } from "./components/code-quiz/code-quiz.component";
import { ViewQuizComponent } from "./components/view-quiz/view-quiz.component";
import { QuizzesRoutingModule } from "./quizzes-routing.module";
import { QuizzesComponent } from "./quizzes.component";

import { QuizzesListComponent } from "./components/quizzes-list/quizzes-list.component";
@NgModule({
  declarations: [
    QuizzesListComponent,
    QuizzesComponent,
    AddEditQuizComponent,
    ViewQuizComponent,
    CodeQuizComponent,
  ],
  imports: [CommonModule, QuizzesRoutingModule, SharedModule],
})
export class QuizzesModule {}
