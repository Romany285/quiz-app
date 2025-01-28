import { Component, inject } from "@angular/core";
import { AuthService } from "../../../feature/auth/services/auth.service";
import { HelperServiceService } from "../../services/helper service/helper-service.service";

interface IMenu {
  link: string;
  icon: string;
  text: string;
  isActive: boolean;
}

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  private _authService = inject(AuthService);
  private _helperService = inject(HelperServiceService);
  isExpanded = false;
  ngOnInit() {
    this._helperService.isExpanded$.subscribe(
      (expanded) => (this.isExpanded = expanded)
    );
  }

  isInstructor(): boolean {
    return this._authService.role == "Instructor";
  }
  isStudent(): boolean {
    return this._authService.role == "Student";
  }
  menu: IMenu[] = [
    {
      link: this.isInstructor() ? "dashboard" : "dashboard/student",
      icon: "Dashboard-icon",
      text: "Dashboard",
      isActive: this.isInstructor() || this.isStudent(),
    },
    {
      link: "dashboard/groups",
      icon: "Groups-icon",
      text: "Groups",
      isActive: this.isInstructor(),
    },
    {
      link: "dashboard/students",
      icon: "Groups-icon",
      text: "Students",
      isActive: this.isInstructor(),
    },
    {
      link: this.isInstructor()
        ? "dashboard/quizzes"
        : "dashboard/student/exams",
      icon: "Quizzes-icon",
      text: "Quizzes",
      isActive: this.isInstructor() || this.isStudent(),
    },
    {
      link: this.isInstructor()
        ? "dashboard/results"
        : "dashboard/student/results",
      icon: "Results-icon",
      text: "Results",
      isActive: this.isInstructor() || this.isStudent(),
    },
  ];
}
