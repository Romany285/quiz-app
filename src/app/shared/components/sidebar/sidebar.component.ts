import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';

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
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {

  private _authService = inject(AuthService);

  @Input() isExpanded: boolean = false;

  @Output() toggle = new EventEmitter<void>();

  toggleSidebar(): void {
    this.toggle.emit();
  }

  isInstructor(): boolean {
    return this._authService.role == 'Instructor';
  }

  isStudent(): boolean {
    return this._authService.role == 'Student';
  }

  menu: IMenu[] = [
    {
      link: this.isInstructor() ? 'dashboard' : 'dashboard/student',
      icon: 'Dashboard-icon',
      text: 'Dashboard',
      isActive: this.isInstructor() || this.isStudent(),
    },
    {
      link: 'dashboard/groups',
      icon: 'Groups-icon',
      text: 'Groups',
      isActive: this.isInstructor(),
    },
    {
      link: 'dashboard/students',
      icon: 'Groups-icon',
      text: 'Students',
      isActive: this.isInstructor(),
    },
    {
      link: this.isInstructor()
        ? 'dashboard/quizzes'
        : 'dashboard/student/quizzes',
      icon: 'Quizzes-icon',
      text: 'Quizzes',
      isActive: this.isInstructor() || this.isStudent(),
    },
    {
      link: this.isInstructor()
        ? 'dashboard/results'
        : 'dashboard/student/results',
      icon: 'Results-icon',
      text: 'Results',
      isActive: this.isInstructor() || this.isStudent(),
    },
  ];
}