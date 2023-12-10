import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FavoritosService } from "../services/favoritos/favoritos.service";
import { SharedModule } from "../shared/shared.module";
import { FavoritosComponent } from "./favoritos.component";
import { FavoritosRoutes } from "./favoritos.routing";
import { CardFavoritosComponent } from "./card-favoritos/card-favoritos.component";


@NgModule({
  declarations: [FavoritosComponent, CardFavoritosComponent],
  imports: [CommonModule, FavoritosRoutes,SharedModule],
  providers:[FavoritosService]
})
export class FavoritosModule {}
