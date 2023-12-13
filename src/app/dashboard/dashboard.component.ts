import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { Livro, VersiculoViewModel } from '../models/models';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { ServicoHttp } from '../services/http/http.service';
import { ImagemService } from '../services/tema/imagem.service';
import { WhatsappService } from '../services/whatsapp/whatsapp.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  imagemDash?: string;

  favoritos: VersiculoViewModel[] = [];
  livros!: Livro[];
  salmo?: VersiculoViewModel;

  livrosIndexInicial!: number;
  livrosIndexFinal!: number;

  ehFavorito = false

  constructor(
    private imagemService: ImagemService,
    private route: ActivatedRoute,
    private servicehttp: ServicoHttp,
    private router: Router,
    private localStorageService: LocalStorageService,
    private snack: MatSnackBar,
    private serviceWhats: WhatsappService
  ) { }

  ngOnInit(): void {
    this.imagemService.imagemAlterada().subscribe((x) => {
      this.imagemDash = this.imagemService.obterImagem(x, 'dash');
    });

    this.obterDados();
    this.obterSalmoDoDia();
  }

  async obterDados() {
    this.livrosIndexInicial = Math.floor(Math.random() * 58);
    this.livrosIndexFinal = this.livrosIndexInicial + 6;

    this.favoritos = this.route.snapshot.data['favoritos']

    let dados = await this.localStorageService.obterLivros();

    if (dados) this.livros = dados as Livro[];
    else {
      this.servicehttp.ObterLivros().subscribe((x) => {
        this.livros = x;
        this.localStorageService.salvarLivros(this.livros);
      });
    }
  }

  obterSalmoDoDia() {
    let salmo = this.localStorageService.obterSalmo();

    if (this.localStorageService.ehFavorito(salmo))
      this.ehFavorito = true

    if (salmo != null) this.salmo = salmo;
    else {
      this.servicehttp
        .ObterVersiculoAleatorioDeUmLivro('sl')
        .pipe(take(1))
        .subscribe((x) => {
          if (this.localStorageService.validarSalmo(x)) {
            this.localStorageService.salvarSalmoDoDia(x);
            this.salmo = x;
          } else this.obterSalmoDoDia();
        });
    }
  }

  irParaLivro(livro: Livro) {
    this.router.navigate([
      '/capitulos/livro',
      livro.abbrev.pt,
      1,
      livro.chapters,
    ]);
  }

  marcarSalmoFavorito(salmo: VersiculoViewModel) {
    if (this.ehFavorito == false)
      this.localStorageService.salvarFavorito(salmo)
    else
      this.localStorageService.remover(salmo)

    this.favoritos = this.localStorageService.obterFavoritosOrdenado()
    this.ehFavorito = !this.ehFavorito
  }

  removerFavoritos(verse: VersiculoViewModel) {
    this.localStorageService.remover(verse);

    let index = this.favoritos.findIndex(x => x.text = verse.text)

    this.favoritos?.splice(index, 1);

    this.snack.open('Favorito removido com sucesso');

    this.favoritos = this.localStorageService.obterFavoritosOrdenado()

    if (verse.text == this.salmo?.text)
      this.ehFavorito = !this.ehFavorito
  }

  compartilhar(salmo: VersiculoViewModel) {
    this.serviceWhats.compartilhar(salmo)
  }
}
