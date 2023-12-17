import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment.development";


export const IncluirTokenInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const token = environment.tokenApi;

  let url = request.url.split('/')[2]

  if (url == "www.abibliadigital.com.br") {
    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    })
  }

  return next(request);
}
