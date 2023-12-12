import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';

import { Livro } from '../../models/models';
import { ServicoHttp } from '../../services/http/http.service';

@Component({
  selector: 'app-form-capitulo',
  templateUrl: './form-capitulo.component.html',
  styleUrls: ['./form-capitulo.component.scss']
})
export class FormCapituloComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: ServicoHttp,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.gerarFormulario();
    this.livros$ = this.route.data.pipe(map(x => x['livros']))
  }

  livros$!: Observable<Livro[]>;
  form!: FormGroup;
  capitulos: number[] = [];

  public Buscar() {
    if (!this.form.valid) {
      return;
    }

    let livro = this.form.value.livro as Livro;
    let capitulo = this.form.value.capitulo;

    this.router.navigate(['livro', livro.abbrev.pt, capitulo, livro.chapters], {
      relativeTo: this.route.parent,
    });
  }

  private gerarFormulario() {
    this.form = this.fb.group({
      livro: new FormControl(null, [Validators.required]),
      capitulo: new FormControl(null, [Validators.required]),
    });

    this.form.get('livro')!.valueChanges.subscribe((livro) => {
      this.obterCapitulos(livro);
    });
  }

  private obterCapitulos(livro: Livro) {
    this.capitulos = [];

    let nr: number = 1;

    while (nr <= livro.chapters!) {
      this.capitulos.push(nr++);
    }
  }
}
