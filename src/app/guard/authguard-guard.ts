import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('watson');

  if (token) {
    // ✅ Token exists, allow access
    return true;
  } else {
    // ❌ No token found, redirect to login
    router.navigate(['/login']);
    return false;
  }
};
