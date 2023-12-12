import { inject } from '@angular/core';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { Routes, RouterModule } from '@angular/router';
import { ServicoHttp } from '../services/http/http.service';
import { PesquisarLivrosComponent } from './pesquisar-livros/pesquisar-livros.component';
import { DadosPreviosService } from '../services/dadosPrevios/dados-previos.service';
import { of } from 'rxjs';
import { LocalStorageService } from '../services/favoritos/localStorage.service';

export const resolveLivros = () => {

  let cache = inject(LocalStorageService).obterLivros()

  if (cache)
    return of(cache)

  return inject(ServicoHttp).ObterLivros()
}
const routes: Routes = [
  {
    path: "",
    component: ListarLivrosComponent,
    resolve: { livros: resolveLivros }
  },
  {
    path: "pesquisar",
    component: PesquisarLivrosComponent
  }
];

export const LivrosRoutes = RouterModule.forChild(routes);
