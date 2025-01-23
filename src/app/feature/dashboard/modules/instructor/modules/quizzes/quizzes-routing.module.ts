import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';

const routes: Routes = [{ path: '', component: QuizzesComponent }, { path: 'questions', loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
