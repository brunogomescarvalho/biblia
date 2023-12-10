import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class LoadingService {

  private estaCarregandoSubject: BehaviorSubject<boolean>

  constructor() {
    this.estaCarregandoSubject = new BehaviorSubject<boolean>(false)
  }

  mostrarCarregamento() {
    this.estaCarregandoSubject.next(true)
  }

  ocultarCarregamento() {
    this.estaCarregandoSubject.next(false)
  }

  estaCarregando(): Observable<any> {
    return this.estaCarregandoSubject.asObservable();
  }
}
