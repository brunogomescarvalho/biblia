import { resolveLivros } from './../livros/livros.routing';
import { Routes, RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { FormCapituloComponent } from './form-capitulo/form-capitulo.component';
import { NgModule, inject } from '@angular/core';
import { ServicoHttp } from '../services/http/http.service';
import { Capitulo } from '../models/models';
import { CapituloComponent } from './capitulo/capitulo.component';



export const listaVersiculoResolver = (route: ActivatedRouteSnapshot) => {
  let livro = route.params['livro'];
  let capitulo = parseInt(route.params['capitulo']);
  let total = parseInt(route.params['total']);

  if (capitulo > total) return null;

  return inject(ServicoHttp).ObterVersiculosPorCapitulo(livro, capitulo);
};

const routes: Routes = [
  {
    path: '',
    component: FormCapituloComponent,
    resolve: { livros: resolveLivros }
  },
  {
    path: 'livro/:livro/:capitulo/:total',
    component: CapituloComponent,
    resolve: { detalhes: listaVersiculoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapitulosRoutes { }
