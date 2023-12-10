import { Component, Input, OnInit } from '@angular/core';
import { AppMaterialModule } from '../app-material/app-material.module';
import { VersiculoViewModel } from '../../models/models';
import { FavoritosService } from '../../services/favoritos/favoritos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-versiculos',
  standalone: true,
  imports: [SharedModule, CommonModule],
  providers: [FavoritosService],
  templateUrl: './card-versiculos.component.html',
  styleUrls: ['./card-versiculos.component.scss',]
})
export class CardVersiculosComponent {
  @Input({ required: true }) versiculo!: VersiculoViewModel;
  @Input({ required: true }) numerar!: boolean;

  constructor(private localStorage: FavoritosService, private snack: MatSnackBar) { }

  favoritar(versiculo: VersiculoViewModel) {
    let salvou = this.localStorage.salvarFavorito(versiculo)

    this.snack.open(salvou ? 'Versículo adicionado aos favoritos com sucesso' :
      'Esse versículo já é favorito')

  }
}
