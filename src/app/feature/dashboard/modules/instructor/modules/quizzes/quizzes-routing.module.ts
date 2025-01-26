import { RouterModule, Routes } from '@angular/router';
import { QuizzesComponent } from './quizzes.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { QuizzesListComponent } from "./components/quizzes-list/quizzes-list.component";
import { NgModule } from '@angular/core';
const routes: Routes = [{ path: '', component: QuizzesComponent }, 
  {path:'view/:id',component:ViewQuizComponent},
  { path: 'questions', loadChildren: () => import('./modules/questions/questions.module').then(m => m.QuestionsModule) },
  { path: "quizzes-list", component: QuizzesListComponent },
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}
