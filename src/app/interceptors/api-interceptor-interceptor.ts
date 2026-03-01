import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    withCredentials: true
  });
  return next(clonedRequest);
};
