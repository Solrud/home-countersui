import {CanActivateFn, Router} from '@angular/router';
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "../../data/service/Auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

export const authGuard: CanActivateFn = (route, state) => {
  const routerService = inject(Router);
  const authService = inject(AuthService);
  const jwtHelper = inject(JwtHelperService);

  const token = authService.getAccessToken;

  try {
    if (!token && jwtHelper.isTokenExpired(token)) {
      routerService.navigate(['/auth']);
      return false;
    }
  } catch {
    routerService.navigate(['/auth']);
    return false;
  }

  return authService.checkToken$().pipe(
    map(result => {
      if (result === true) {
        return true;
      } else {
        routerService.navigate(['/auth']);
        return false;
      }
    }),
    catchError(error => {
      routerService.navigate(['/auth']);
      return of(false);
    })
  );
};
