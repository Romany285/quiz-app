import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { AddEditQuizComponent } from './components/add-edit-quiz/add-edit-quiz.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { CodeQuizComponent } from './components/code-quiz/code-quiz.component';


@NgModule({
  declarations: [
    QuizzesComponent,
    AddEditQuizComponent,
    ViewQuizComponent,
    CodeQuizComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,SharedModule
  ]
})
export class QuizzesModule {}
