import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  _dashboardService = inject(DashboardService);

  isExpanded = false;
  mobileSidebarOpen = false;

  ngOnInit(): void {
    this._dashboardService.getTopFiveQuizzes().subscribe({
      next: (res) => {
        // console.log(res);
      }
    });
  }

  toggleSidebar(): void {

    // Mobile
    if (window.innerWidth <= 767) {
      this.mobileSidebarOpen = !this.mobileSidebarOpen;
      return;
    }

    // Desktop
    this.isExpanded = !this.isExpanded;
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen = false;
  }
}