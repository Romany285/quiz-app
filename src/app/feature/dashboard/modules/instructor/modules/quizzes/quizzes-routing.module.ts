import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { QuizzesListComponent } from "./components/quizzes-list/quizzes-list.component";
import { QuizzesComponent } from "./quizzes.component";

const routes: Routes = [
  { path: "", component: QuizzesComponent },
  {
    path: "questions",
    loadChildren: () =>
      import("./modules/questions/questions.module").then(
        (m) => m.QuestionsModule
      ),
  },
  { path: "quizzes-list", component: QuizzesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzesRoutingModule {}
