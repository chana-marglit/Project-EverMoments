// // src/app/core/guards/auth.guard.ts
// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     if (this.authService.isAuthenticated()) {
//       // בדיקה אם נדרשת הרשאת מנהל
//       if (route.data['requiresAdmin'] && !this.authService.isAdmin()) {
//         this.router.navigate(['/dashboard']);
//         return false;
//       }
//       return true;
//     }

//     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
//     return false;
//   }
// }
import { inject } from "@angular/core"
import { Router, type CanActivateFn } from "@angular/router"
import { AuthService } from "../services/auth.service"

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isAuthenticated()) {
    // בדיקה אם נדרשת הרשאת מנהל
    if (route.data?.["requiresAdmin"] && !authService.isAdmin()) {
      router.navigate(["/dashboard"])
      return false
    }
    return true
  }

  router.navigate(["/login"], { queryParams: { returnUrl: state.url } })
  return false
}
