import { inject } from '@angular/core';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { Routes, RouterModule } from '@angular/router';
import { ServicoHttp } from '../services/http/http.service';
import { PesquisarLivrosComponent } from './pesquisar-livros/pesquisar-livros.component';

const resolveLivros = () => {
  return inject(ServicoHttp).ObterLivros()
}
const routes: Routes = [
  {
    path: "",
    component: ListarLivrosComponent,
    resolve: { livros: resolveLivros }
  },
  {
    path:"pesquisar",
    component: PesquisarLivrosComponent
  }
];

export const LivrosRoutes = RouterModule.forChild(routes);
