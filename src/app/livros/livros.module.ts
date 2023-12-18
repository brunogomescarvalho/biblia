import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ServicoHttp } from '../services/http/http.service';
import { SharedModule } from '../shared/shared.module';
import { ListarLivrosComponent } from './listar-livros/listar-livros.component';
import { LivrosRoutes } from './livros.routing';
import { PesquisarLivrosComponent } from './pesquisar-livros/pesquisar-livros.component';

@NgModule({
  declarations: [PesquisarLivrosComponent, ListarLivrosComponent],
  imports: [CommonModule, LivrosRoutes, SharedModule,FormsModule],
  exports:[],
  providers: [ServicoHttp]
})
export class LivrosModule { }
