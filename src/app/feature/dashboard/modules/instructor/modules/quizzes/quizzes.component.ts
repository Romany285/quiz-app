import { Component } from "@angular/core";

@Component({
  selector: "app-quizzes",
  templateUrl: "./quizzes.component.html",
  styleUrl: "./quizzes.component.scss",
})
export class QuizzesComponent {
  upcomingQuizzes: any[] = [];
  completedQuizzes: any[] = [];
  headers: string[] = ["Title", "Date", "Time", "Number of Students", "Action"];
}
