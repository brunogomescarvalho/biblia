import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Livro } from '../../../../models/models';
import { ServicoHttp } from '../../../../services/http/http.service';

@Component({
  selector: 'app-form-versiculos',
  templateUrl: './form-versiculos.component.html',
  styleUrls: ['./form-versiculos.component.scss']
})
export class FormVersiculos implements OnInit {

  constructor(
    private snack: MatSnackBar,
    private fb: FormBuilder,
    private service: ServicoHttp,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gerarFormulario();
    this.livros$ = this.service.ObterLivros();
  }

  livros$!: Observable<Livro[]>
  form!: FormGroup
  capitulos: number[] = []


  obterCapitulos(livro: Livro) {
    this.capitulos = []

    let nr: number = 1

    while (nr <= livro.chapters!)
      this.capitulos.push(nr++)
  }

  public Buscar() {

    if (!this.form.valid) {
      return;
    }

    let livro = this.form.value.livro as Livro
    let capitulo = this.form.value.capitulo
    let numero = this.form.value.numero

    this.service.ObterVersiculo(livro.abbrev.pt, capitulo, numero)
      .subscribe({
        error: () => this.snack.open("Versículo não encontrado"),
        next: () => this.router.navigate(['pesquisa', livro.abbrev.pt, capitulo, numero], { relativeTo: this.route.parent })
      })
  }

  private gerarFormulario() {
    this.form = this.fb.group({
      livro: new FormControl(null, [Validators.required]),
      capitulo: new FormControl(null, [Validators.required]),
      numero: new FormControl(null, [Validators.required]),
    });

    this.form.get('livro')!.valueChanges.subscribe((livro) => {
      this.obterCapitulos(livro)

    })
  }
}

