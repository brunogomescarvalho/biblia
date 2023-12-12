import { Component, OnInit } from '@angular/core';
import { Observable, map, of, take } from 'rxjs';
import { Livro } from '../../models/models';
import { ServicoHttp } from '../../services/http/http.service';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/favoritos/localStorage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pesquisar-livros',
  templateUrl: './pesquisar-livros.component.html',
  styleUrls: ['./pesquisar-livros.component.scss']
})
export class PesquisarLivrosComponent implements OnInit {

  constructor(private service: ServicoHttp, private route: ActivatedRoute, private localStorage: LocalStorageService) { }

  livros$!: Observable<Livro[]>

  livro$!: Observable<Livro>

  livroSelecionado!: any

  ngOnInit(): void {
    this.livros$ = this.route.data.pipe(map(x => x['livros']))
  }

  buscar() {
    if (this.livroSelecionado)
      this.livro$ = this.service.ObterDetalhesLivro(this.livroSelecionado)
  }

  limpar() {
    if (this.livro$) {
      this.livro$ = of().pipe(take(1))
      this.livroSelecionado = null
    }
  }
}
