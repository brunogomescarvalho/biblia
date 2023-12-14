import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { CardFavoritosComponent } from './card-favoritos/card-favoritos.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { CardHoverDirective } from './directives/card-hover-directve';
import { CardLivrosComponent } from '../livros/card-livros/card-livros.component';
import { ServicoHttp } from '../services/http/http.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WhatsappService } from '../services/whatsapp/whatsapp.service';

@NgModule({
  declarations: [
    DashboardComponent,
    CardHoverDirective,
    CardFavoritosComponent,
    CardLivrosComponent,

  ],
  imports: [CommonModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    CardHoverDirective,
    AppMaterialModule,
    CardFavoritosComponent,
    CardLivrosComponent,

  ],
  providers: [ServicoHttp, WhatsappService],
})
export class SharedModule { }
