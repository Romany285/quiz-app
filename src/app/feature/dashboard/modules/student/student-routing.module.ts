import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentComponent } from "./student.component";

const routes: Routes = [
  { path: "", component: StudentComponent },
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
