import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { finalize } from 'rxjs';
import { LoadingService } from './loadingService';

export const interceptorLoading = (request: HttpRequest<unknown>,next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);

  loadingService.mostrarCarregamento();

  return next(request).pipe(
    finalize(() => loadingService.ocultarCarregamento())
  );
};
