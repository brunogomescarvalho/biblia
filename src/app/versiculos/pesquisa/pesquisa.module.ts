import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServicoHttp } from '../../services/http/http.service';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CardVersiculosComponent } from '../../shared/card-versiculos/card-versiculos.component';

import { FormVersiculos } from './busca-por-numero/form-versiculo/form-versiculos.component';
import { VersiculoComponent } from './busca-por-numero/versiculo/versiculo.component';
import { PesquisaVersiculoRoutes } from './pesquisaVersiculo.routing';
import { VersiculoPorPalavraComponent } from './busca-por-palavra/versiculo-por-palavra/versiculo-por-palavra.component';

@NgModule({
  declarations: [
    FormVersiculos,
    VersiculoComponent,
    VersiculoPorPalavraComponent
  ],
  imports: [
    CommonModule,
    PesquisaVersiculoRoutes,
    AppMaterialModule,
    CardVersiculosComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ServicoHttp],
})
export class PesquisaModule { }
