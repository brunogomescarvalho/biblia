import { FavoritosService } from './../services/favoritos/favoritos.service';
import { Observable, first, map, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Livro, VersiculoViewModel } from '../models/models';
import { ImagemService } from '../services/tema/imagem.service';
import { ServicoHttp } from '../services/http/http.service';
import { DadosPreviosService } from '../services/dadosPrevios/dados-previos.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  imagemDash?: string;

  favoritos: VersiculoViewModel[] = []
  livros!: Livro[]
  salmo?: VersiculoViewModel

  livrosIndexInicial!: number
  livrosIndexFinal!: number

  constructor(
    private imagemService: ImagemService,
    private route: ActivatedRoute,
    private servicehttp: ServicoHttp,
    private router: Router,
    private dados: DadosPreviosService,
    private favoritoService: FavoritosService,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.imagemService.imagemAlterada()
      .subscribe(x => {
        this.imagemDash = this.imagemService.obterImagem(x, 'dash')
      })

    this.obterDados()
    this.obterSalmoDoDia()
  }

  async obterDados() {
    this.livrosIndexInicial = Math.floor(Math.random() * 58)
    this.livrosIndexFinal = this.livrosIndexInicial + 6

    this.favoritos = await this.route.snapshot.data['favoritos']

    let dados = await this.dados.obterCache()

    if (dados)
      this.livros = dados as Livro[]

    else {
      this.servicehttp.ObterLivros()
        .subscribe(x => {
          this.livros = x
          this.dados.salvarCache(this.livros)
        })
    }
  }

  obterSalmoDoDia() {
    let salmo = this.dados.obterSalmo()

    if (salmo != null)
      this.salmo = salmo

    else {
      this.servicehttp.ObterVersiculoAleatorioDeUmLivro('sl')
        .subscribe(x => {
          if (this.dados.validarSalmo(x)) {
            this.dados.salvarSalmoDoDia(x)
            this.salmo = x
          }

          else
            this.obterSalmoDoDia()
        })
    }
  }

  irParaLivro(livro: Livro) {
    this.router.navigate(["/capitulos/livro", livro.abbrev.pt, 1, livro.chapters])
  }

  remover(index: any) {
    this.favoritoService.remover(index)

    this.favoritos?.splice(index, 1)

    this.snack.open('Favorito removido com sucesso');
  }


}
