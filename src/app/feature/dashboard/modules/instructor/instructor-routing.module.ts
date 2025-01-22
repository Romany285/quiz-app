import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstructorComponent } from "./instructor.component";
import { ChildDashboardComponent } from "./components/child-dashboard/child-dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: ChildDashboardComponent
  },
  {
    path: "students",
    loadChildren: () =>
      import("./modules/students/students.module").then(
        (m) => m.StudentsModule
      ),
  },
  {
    path: "groups",
    loadChildren: () =>
      import("./modules/groups/groups.module").then((m) => m.GroupsModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorRoutingModule {}
