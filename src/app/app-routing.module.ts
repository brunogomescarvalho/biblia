import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { of } from 'rxjs';

import { DashboardComponent } from './dashboard/dashboard.component';
import { resolverFavoritos } from './favoritos/favoritos.routing';
import { resolveLivros } from './livros/livros.routing';
import { ImagemDoDiaService } from './services/http/imagem-do-dia.service';
import { LocalStorageService } from './services/localStorage/localStorage.service';

export const obterImagemDoDia = () => {
  let localStorageService = new LocalStorageService();

  let imagem = localStorageService.obterImagemDia();

  if (imagem) return of(imagem);

  let imagemDoDia = inject(ImagemDoDiaService).obterImagemDoDia();

  imagemDoDia.subscribe((x) => localStorageService.salvarImagemDoDia(x));

  return imagemDoDia;
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: {
      favoritos: resolverFavoritos,
      livros: resolveLivros,
      imagemDoDia: obterImagemDoDia,
    },
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
