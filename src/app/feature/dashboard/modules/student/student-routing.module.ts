import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentComponent } from "./student.component";
import { ResultsComponent } from "./components/results/results.component";
import { QuizzesComponent } from "./components/quizzes/quizzes.component";

const routes: Routes = [
  {
    path: "exam",
    loadChildren: () =>
      import("./modules/exams/exams.module").then((m) => m.ExamsModule),
  },
  {path:'results',component:ResultsComponent},
  {path:'quizzes',component:QuizzesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
