import { Component, inject, OnInit } from "@angular/core";
import { DashboardService } from "./services/dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  _dashboardService = inject(DashboardService);
  isExpanded: boolean = false;
  ngOnInit(): void {
    this.toggleSidebar()
    this._dashboardService.getTopFiveQuizzes().subscribe({
      next: (res) => {
        // console.log(res)
      },
    });
  }
  toggleSidebar() {
    this.isExpanded !== this.isExpanded;
    console.log(this.isExpanded)
  }
}
