import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ServicoHttp } from '../../../../services/http/http.service';
import { ObterVersiculosPorPalavra } from './../../../../models/models';

@Component({
  selector: 'app-versiculo-por-palavra',
  templateUrl: './versiculo-por-palavra.component.html',
  styleUrls: ['./versiculo-por-palavra.component.scss'],
})
export class VersiculoPorPalavraComponent {
  palavra?: string;

  versiculo$?: Observable<ObterVersiculosPorPalavra>;

  index: number = 0;

  palavraInformada: string = '';

  constructor(private service: ServicoHttp) { }

  buscar() {
    if (!this.palavra || this.palavra == this.palavraInformada) return;

    this.palavraInformada = this.palavra;

    let obj = {
      version: 'nvi',
      search: this.palavra,
    };

    this.versiculo$ = this.service.ObterVersiculoPorPalavra(obj);
  }

  proximo(limite: number) {
    if (this.index >= limite - 1) return;
    this.index++;
  }

  anterior() {
    if (this.index == 0) return;
    this.index--;
  }

  limpar() {
    if (this.versiculo$) this.versiculo$ = of();
    this.palavra = '';
  }
}
