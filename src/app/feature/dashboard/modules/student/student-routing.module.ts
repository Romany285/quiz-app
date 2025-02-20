import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChildDashboardComponent } from "../instructor/components/child-dashboard/child-dashboard.component";
import { QuizzesComponent } from "./components/quizzes/quizzes.component";
import { ResultsComponent } from "./components/results/results.component";

const routes: Routes = [
  {
    path: "",
    component: ChildDashboardComponent,
  },
  {
    path: "exams",
    loadChildren: () =>
      import("./modules/exams/exams.module").then((m) => m.ExamsModule),
  },
  { path: "results", component: ResultsComponent },
  { path: "quizzes", component: QuizzesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
