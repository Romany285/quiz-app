import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "../../../../../../shared/shared.module";
import { ResultsRoutingModule } from "./results-routing.module";
import { ResultsComponent } from "./results.component";

@NgModule({
  declarations: [ResultsComponent],
  imports: [CommonModule, ResultsRoutingModule, SharedModule],
})
export class ResultsModule {}
