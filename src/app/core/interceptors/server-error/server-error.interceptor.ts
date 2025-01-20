import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { HandleErrorService } from "../../../shared/services/handle-http-error/handle-error.service";

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const handleErrorService = inject(HandleErrorService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const resMsg = error.error.message;
      handleErrorService.handleError(error);
      return throwError(() => error);
    })
  );
};
