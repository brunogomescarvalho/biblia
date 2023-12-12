import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';

import { Livro, VersiculoViewModel } from '../../../models/models';
import { ServicoHttp } from '../../../services/http/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aleatorio-por-livro',
  templateUrl: './aleatorio-por-livro.component.html',
  styleUrls: ['./aleatorio-por-livro.component.scss'],
})
export class AleatorioPorLivroComponent implements OnInit {
  constructor(private service: ServicoHttp, private route: ActivatedRoute) { }

  livros$!: Observable<Livro[]>;

  versiculo$!: Observable<VersiculoViewModel>;

  form!: FormGroup;

  ngOnInit(): void {
    this.livros$ = this.route.data.pipe(map(x => x['livros']))

    this.form = new FormGroup({
      livro: new FormControl(null, [Validators.required]),
    });
  }

  buscar() {
    if (this.form.valid) {
      let livro: Livro = this.form.value.livro;
      this.versiculo$ = this.service.ObterVersiculoAleatorioDeUmLivro(
        livro.abbrev.pt
      );
    }
  }

  limpar() {
    if (this.versiculo$) this.versiculo$ = of();
  }
}
