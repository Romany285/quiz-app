import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { instructorGuard } from "../../core/guards/instructor/instructor.guard";
import { studentGuard } from "../../core/guards/student/student.guard";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "instructor",
        canActivate: [instructorGuard],
        loadChildren: () =>
          import("./modules/instructor/instructor.module").then(
            (m) => m.InstructorModule
          ),
      },
      {
        path: "student",
        canActivate: [studentGuard],
        loadChildren: () =>
          import("./modules/student/student.module").then(
            (m) => m.StudentModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
