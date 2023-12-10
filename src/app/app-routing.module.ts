import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
