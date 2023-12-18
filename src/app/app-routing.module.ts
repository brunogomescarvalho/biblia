import { LocalStorageService } from './services/localStorage/localStorage.service';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { resolverFavoritos } from './favoritos/favoritos.routing';
import { of } from 'rxjs';
import { ServicoHttp } from './services/http/http.service';
import { ImagemDoDiaService } from './services/http/imagem-do-dia.service';

const obterImagemDoDia = () => {

  let localStorageService = inject(LocalStorageService)
  let imagem = localStorageService.obterImagemDia()

  if (imagem)
    return of(imagem)

  let imagemDoDia = inject(ImagemDoDiaService).obterImagemDoDia()
  imagemDoDia.subscribe(x => localStorageService.salvarImagemDoDia(x))

  return imagemDoDia
}

const obterLivros = async () => {

  let localStorageService = inject(LocalStorageService)
  let dados = await localStorageService.obterLivros();

  if (dados)
    return of(dados)

  let livros = inject(ServicoHttp).ObterLivros()
  livros.subscribe(x => localStorageService.salvarLivros(x))

  return livros

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
    resolve: { favoritos: resolverFavoritos, imagemDoDia: obterImagemDoDia, livros: obterLivros }
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
