import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FavoritosService } from './services/favoritos/favoritos.service';
import { resolverFavoritos } from './favoritos/favoritos.routing';
import { resolveLivros } from './livros/livros.routing';
import { ServicoHttp } from './services/http/http.service';

const salmoResolve = () => {
  return inject(ServicoHttp).ObterVersiculoAleatorioDeUmLivro('sl')
}


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { favoritos: resolverFavoritos}
  },
  {
    path: 'versiculos',
    loadChildren: () =>
      import('./versiculos/pesquisa/pesquisa.module').then(
        (x) => x.PesquisaModule
      ),
  },
  {
    path: 'versiculos-aleatorios',
    loadChildren: () =>
      import('./versiculos/aleatorio/aleatorio.module').then(
        (x) => x.AleatorioModule
      ),
  },
  {
    path: 'favoritos',
    loadChildren: () =>
      import('./favoritos/favoritos.module').then((x) => x.FavoritosModule),
  },
  {
    path: 'livros',
    loadChildren: () =>
      import('./livros/livros.module').then((x) => x.LivrosModule),
  },
  {
    path: 'capitulos',
    loadChildren: () =>
      import('./capitulos/capitulos.module').then((x) => x.CapitulosModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
