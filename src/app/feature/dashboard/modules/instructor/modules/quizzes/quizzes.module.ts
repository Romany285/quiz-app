import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizzesComponent } from './quizzes.component';
import { AddEditQuizComponent } from './components/add-edit-quiz/add-edit-quiz.component';
import { SharedModule } from '../../../../../../shared/shared.module';


@NgModule({
  declarations: [
    QuizzesComponent,
    AddEditQuizComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,SharedModule
  ]
})
export class QuizzesModule { }
