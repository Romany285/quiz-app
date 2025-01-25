import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';

const routes: Routes = [{ path: '', component: QuizzesComponent }, 
  {path:'view',component:ViewQuizComponent},
  { path: 'questions', loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
