import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const isUserLoggedInGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
 
  if (auth.checkLogin()) {
    console.log(auth.checkLogin)
    console.log("from auth gaurd" + localStorage.getItem('isUserLoggedIn'))
    return true;
  } else {
    alert('You signedout bro! Sign in again!');
    return false;
  }
};
