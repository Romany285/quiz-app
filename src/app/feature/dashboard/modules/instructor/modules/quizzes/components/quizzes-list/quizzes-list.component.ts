import { Component } from "@angular/core";

@Component({
  selector: "app-quizzes-list",
  templateUrl: "./quizzes-list.component.html",
  styleUrl: "./quizzes-list.component.scss",
})
export class QuizzesListComponent {
  upcomingQuizzes: any[] = [];
  completedQuizzes: any[] = [];
  headers: string[] = ["Title", "Date", "Time", "Number of Students", "Action"];
}
