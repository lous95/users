import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred!';
      console.log(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};
