import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth/auth.guard";
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./feature/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadChildren: () =>
      import("./feature/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },

  { path: "**", component: NotFoundComponent, title: "Not Found Page" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
