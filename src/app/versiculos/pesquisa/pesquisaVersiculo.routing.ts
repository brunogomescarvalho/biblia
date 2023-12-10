import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, Routes } from '@angular/router';

import { ServicoHttp } from '../../services/http/http.service';

import { FormVersiculos } from './busca-por-numero/form-versiculo/form-versiculos.component';
import { VersiculoComponent } from './busca-por-numero/versiculo/versiculo.component';
import { VersiculoPorPalavraComponent } from './busca-por-palavra/versiculo-por-palavra/versiculo-por-palavra.component';



export const versiculoResolver = (
  route: ActivatedRouteSnapshot,
  router: Router
) => {
  let livro = route.params['livro'];
  let capitulo = parseInt(route.params['capitulo']);
  let numero = parseInt(route.params['numero']);

  return inject(ServicoHttp).ObterVersiculo(livro, capitulo, numero);
};

const routes: Routes = [
  {
    path: '',
    component: FormVersiculos,
  },


  {
    path: 'pesquisa/:livro/:capitulo/:numero',
    component: VersiculoComponent,
    resolve: { versiculo: versiculoResolver },
  },
  {
    path: 'palavra',
    component: VersiculoPorPalavraComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesquisaVersiculoRoutes {}
