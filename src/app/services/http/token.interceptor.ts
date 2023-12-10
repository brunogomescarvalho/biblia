import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment.development";


export const IncluirTokenInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const token = environment.tokenApi;

  const requestClone = request.clone({
    headers: request.headers.set('Authorization', `Bearer ${token}`),
  })

  return next(requestClone);
}
