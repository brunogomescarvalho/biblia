import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ServicoHttp } from '../../services/http/http.service';
import { CardVersiculosComponent } from '../../shared/card-versiculos/card-versiculos.component';
import { SharedModule } from '../../shared/shared.module';
import { AleatorioPorCapituloComponent } from './aleatorio-por-capitulo/aleatorio-por-capitulo.component';
import { AleatorioPorLivroComponent } from './aleatorio-por-livro/aleatorio-por-livro.component';
import { VersiculoAleatorioRoutes } from './versiculoAleatorio.routing';


@NgModule({
  declarations: [
    AleatorioPorCapituloComponent,
    AleatorioPorLivroComponent
  ],
  imports: [
    CommonModule,
    VersiculoAleatorioRoutes,
    SharedModule,
    CardVersiculosComponent,
    ReactiveFormsModule,
  ], providers: [ServicoHttp]
})
export class AleatorioModule { }
