import { inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { of } from 'rxjs';

import { ServicoHttp } from '../services/http/http.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { PesquisarLivrosComponent } from './pesquisar-livros/pesquisar-livros.component';

export const resolveLivros = () => {

  let serviceStorage = inject(LocalStorageService)

  let cache = serviceStorage.obterLivros()

  if (cache)
    return of(cache)

  let livros = inject(ServicoHttp).ObterLivros();

  livros.subscribe(x => serviceStorage.salvarLivros(x))

  return livros
}


const routes: Routes = [
  {
    path: "",
    component: ListarLivrosComponent,
    resolve: { livros: resolveLivros }
  },
  {
    path: "pesquisar",
    component: PesquisarLivrosComponent,
    resolve: { livros: resolveLivros }
  }
];

export const LivrosRoutes = RouterModule.forChild(routes);
