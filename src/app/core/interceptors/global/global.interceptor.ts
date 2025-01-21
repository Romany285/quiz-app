import { HttpInterceptorFn } from "@angular/common/http";

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = "https://upskilling-egypt.com:3005/api/";
  const token = localStorage.getItem("token");
  const newRequest = req.clone({
    url: baseUrl + req.url,
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(newRequest);
};
