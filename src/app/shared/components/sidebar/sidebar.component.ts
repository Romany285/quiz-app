import { Component, inject } from '@angular/core';
import { AuthService } from '../../../feature/auth/services/auth.service';

interface IMenu {
  link: string;
  icon: string;
  text: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private _authService = inject(AuthService);
  isInstructor(): boolean {
    return this._authService.role == 'Instructor';
  }
  isStudent(): boolean {
    return this._authService.role == 'Student';
  }
  menu: IMenu[] = [
    {
      link: 'dashboard/',
      icon: 'Dashboard-icon',
      text: 'Dashboard',
      isActive: this.isInstructor() || this.isStudent(),
    },
    {
      link: 'dashboard/Groups',
      icon: 'Groups-icon',
      text: 'Groups',
      isActive: this.isInstructor(),
    },
    {
      link: 'dashboard/Quizzes',
      icon: 'Quizzes-icon',
      text: 'Quizzes',
      isActive: this.isInstructor() || this.isStudent(),
    },
    {
      link: 'dashboard/Results',
      icon: 'Results-icon',
      text: 'Results',
      isActive: this.isInstructor() || this.isStudent(),
    },
    {
      link: 'dashboard/Help',
      icon: 'Help-icon',
      text: 'Help',
      isActive: this.isInstructor() || this.isStudent(),
    }
  ];
}

