import { inject } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FavoritosService } from "../services/favoritos/favoritos.service";
import { FavoritosComponent } from "./favoritos.component";

export const resolverFavoritos = () => {
  return inject(FavoritosService).obterFavoritos()
}

const routes: Routes = [
  {
    path: "",
    component: FavoritosComponent,
    resolve: { favoritos: resolverFavoritos }
  },
];

export const FavoritosRoutes = RouterModule.forChild(routes);
