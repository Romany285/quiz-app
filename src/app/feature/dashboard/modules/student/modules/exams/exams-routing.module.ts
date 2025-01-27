import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExamsComponent } from "./exams.component";

const routes: Routes = [{ path: "question/:id", component: ExamsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamsRoutingModule {}
