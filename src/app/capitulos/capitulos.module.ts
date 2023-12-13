import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ServicoHttp } from '../services/http/http.service';
import { CardVersiculosComponent } from '../shared/card-versiculos/card-versiculos.component';
import { SharedModule } from '../shared/shared.module';
import { CapituloComponent } from './capitulo/capitulo.component';
import { CapitulosRoutes } from './capitulos.routing';
import { FormCapituloComponent } from './form-capitulo/form-capitulo.component';
import { WhatsappService } from '../services/whatsapp/whatsapp.service';


@NgModule({
  declarations: [FormCapituloComponent, CapituloComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CapitulosRoutes,
    CardVersiculosComponent,
  ],
  providers: [ServicoHttp],
})
export class CapitulosModule { }
