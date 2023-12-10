import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ServicoHttp } from '../services/http/http.service';
import { SharedModule } from '../shared/shared.module';
import { CardLivrosComponent } from './card-livros/card-livros.component';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { LivrosRoutes } from './livros.routing';
import { PesquisarLivrosComponent } from './pesquisar-livros/pesquisar-livros.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PesquisarLivrosComponent, ListarLivrosComponent, CardLivrosComponent],
  imports: [CommonModule, LivrosRoutes, SharedModule,FormsModule],
  providers: [ServicoHttp]
})
export class LivrosModule { }
