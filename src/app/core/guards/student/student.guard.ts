import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../feature/auth/services/auth.service';

export const studentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (localStorage.getItem('token') !== null && authService.role === 'Student') {
    return true;
  }
  router.navigate(['/student']);
   return false
};
