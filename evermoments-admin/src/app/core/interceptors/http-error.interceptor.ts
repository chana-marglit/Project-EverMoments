// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';

// @Injectable()
// export class HttpErrorInterceptor implements HttpInterceptor {
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return next.handle(request).pipe(
//       retry(1),
//       catchError((error: HttpErrorResponse) => {
//         let errorMessage = '';
        
//         if (error.error instanceof ErrorEvent) {
//           // Client-side error
//           errorMessage = `Error: ${error.error.message}`;
//         } else {
//           // Server-side error
//           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//         }
        
//         console.error(errorMessage);
//         return throwError(() => error);
//       })
//     );
//   }
// }
import type { HttpInterceptorFn, HttpErrorResponse } from "@angular/common/http"
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { throwError } from "rxjs"
import { catchError, retry } from "rxjs/operators"

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)

  return next(req).pipe(
    retry(1),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = ""

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`

        // אם השגיאה היא 401 (Unauthorized), נווט לדף התחברות
        if (error.status === 401) {
          router.navigate(["/login"])
        }
      }

      console.error("HTTP Error:", errorMessage)
      return throwError(() => error)
    }),
  )
}
