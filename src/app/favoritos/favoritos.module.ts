import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LocalStorageService } from "../services/favoritos/localStorage.service";
import { SharedModule } from "../shared/shared.module";
import { FavoritosComponent } from "./favoritos.component";
import { FavoritosRoutes } from "./favoritos.routing";



@NgModule({
  declarations: [FavoritosComponent, ],
  imports: [CommonModule, FavoritosRoutes,SharedModule],
  providers:[LocalStorageService]
})
export class FavoritosModule {}
