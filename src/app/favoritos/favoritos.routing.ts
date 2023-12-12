import { inject } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LocalStorageService } from "../services/favoritos/localStorage.service";
import { FavoritosComponent } from "./favoritos.component";

export const resolverFavoritos = () => {
  return inject(LocalStorageService).obterFavoritos()
}

const routes: Routes = [
  {
    path: "",
    component: FavoritosComponent,
    resolve: { favoritos: resolverFavoritos }
  },
];

export const FavoritosRoutes = RouterModule.forChild(routes);
