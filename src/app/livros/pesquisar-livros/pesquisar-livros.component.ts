import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { Livro } from '../../models/models';
import { ServicoHttp } from '../../services/http/http.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pesquisar-livros',
  templateUrl: './pesquisar-livros.component.html',
  styleUrls: ['./pesquisar-livros.component.scss']
})
export class PesquisarLivrosComponent implements OnInit {

  constructor(private service: ServicoHttp) { }

  livros$!: Observable<Livro[]>

  livro$!: Observable<Livro>

  livroSelecionado!: any

  ngOnInit(): void {
    this.livros$ = this.service.ObterLivros()
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
