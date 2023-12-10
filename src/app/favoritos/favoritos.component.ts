import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VersiculoViewModel } from "../models/models";
import { FavoritosService } from "../services/favoritos/favoritos.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
  favoritos?: VersiculoViewModel[];

  constructor(
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private favoritoService: FavoritosService) { }

  ngOnInit(): void {
    this.favoritos = this.route.snapshot.data['favoritos'];

    if (this.favoritos?.length == 0) this.snack.open('Nenhum favorito até o momento');
  }

  remover(index: any) {
    this.favoritoService.remover(index)

    this.favoritos?.splice(index, 1)

    this.snack.open('Favorito removido com sucesso');
  }
}
