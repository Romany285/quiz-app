import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { tap } from "rxjs";
import { HandleHttpResponseService } from "../../../shared/services/handle-http-response/handle-http-response.service";

export const serverResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const handleHttpResponse = inject(HandleHttpResponseService);
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      let resMessage: string = "";
      if (event instanceof HttpResponse) {
        resMessage = event.body.message;
        // handleHttpResponse.handleResponse(event);
      }
    })
  );
};
