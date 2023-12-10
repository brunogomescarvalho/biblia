import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { VersiculoViewModel } from '../../../models/models';
import { ServicoHttp } from '../../../services/http/http.service';

@Component({
  selector: 'app-aleatorio-por-capitulo',
  templateUrl: './aleatorio-por-capitulo.component.html',
  styleUrls: ['./aleatorio-por-capitulo.component.scss'],
})
export class AleatorioPorCapituloComponent {
  constructor(private service: ServicoHttp) {}

  versiculo$!: Observable<VersiculoViewModel>;

  buscar() {
    this.versiculo$ = this.service.ObterVersiculoAleatorio();
  }

  limpar() {
    if (this.versiculo$) this.versiculo$ = of();
  }
}
