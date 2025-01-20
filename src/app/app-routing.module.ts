import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { instructorGuard } from "./core/guards/instructor/instructor.guard";
import { studentGuard } from "./core/guards/student/student.guard";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./feature/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "instructor",
    canActivate: [instructorGuard],
    loadChildren: () =>
      import("./feature/instructor/instructor.module").then(
        (m) => m.InstructorModule
      ),
  },
  {
    path: "student",
    canActivate: [studentGuard],
    loadChildren: () =>
      import("./feature/student/student.module").then((m) => m.StudentModule),
  },
  { path: "**", component: NotFoundComponent, title: "Not Found Page" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
