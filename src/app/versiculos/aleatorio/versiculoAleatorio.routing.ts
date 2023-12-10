import { Routes, RouterModule } from '@angular/router';
import { AleatorioPorCapituloComponent } from './aleatorio-por-capitulo/aleatorio-por-capitulo.component';
import { AleatorioPorLivroComponent } from './aleatorio-por-livro/aleatorio-por-livro.component';

const routes: Routes = [
  {
    path: "",
    component: AleatorioPorCapituloComponent
  },
  {
    path: "livro",
    component: AleatorioPorLivroComponent
  }
];

export const VersiculoAleatorioRoutes = RouterModule.forChild(routes);
