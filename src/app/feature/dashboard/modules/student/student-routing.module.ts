import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChildDashboardComponent } from "../instructor/components/child-dashboard/child-dashboard.component";

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
