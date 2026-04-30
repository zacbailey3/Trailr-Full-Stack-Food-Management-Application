import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  /*
   Prevents unauthorized users from accessing protected routes.
  */
  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);

  return false;

};
