import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";
import { JoinCodeComponent } from './components/join-code/join-code.component';
 
import { QuizzesComponent } from './components/quizzes/quizzes.component';
import { SharedModule } from "../../../../shared/shared.module";
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [StudentComponent, JoinCodeComponent , QuizzesComponent, ResultsComponent],
  imports: [CommonModule, StudentRoutingModule,SharedModule],
})
export class StudentModule {}
