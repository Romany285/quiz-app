import { Component, inject, OnInit } from "@angular/core";
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  _dashboardService = inject(DashboardService)
  ngOnInit(): void {
    this._dashboardService.getTopFiveQuizzes().subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

}
