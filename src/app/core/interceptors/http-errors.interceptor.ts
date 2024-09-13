import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.status === 500) {
        errorMessage = 'Internal Server Error. Please try again later.';
      } else if (error.status === 400) {
        errorMessage = 'Bad Request. Please check your input.';
      }

      return throwError(() => new Error(errorMessage));
    })
  );
};
