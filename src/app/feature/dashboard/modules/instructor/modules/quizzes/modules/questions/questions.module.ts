import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from '../../../../../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddEditViewComponent } from './components/add-edit-view/add-edit-view.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';


@NgModule({
  declarations: [
    QuestionsComponent,
    AddEditViewComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    DeleteQuestionComponent,
    ViewQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class QuestionsModule { }
