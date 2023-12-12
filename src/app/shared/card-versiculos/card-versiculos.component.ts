import { Component, Input, OnInit } from '@angular/core';
import { AppMaterialModule } from '../app-material/app-material.module';
import { VersiculoViewModel } from '../../models/models';
import { LocalStorageService } from '../../services/favoritos/localStorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-versiculos',
  standalone: true,
  imports: [SharedModule, CommonModule],
  providers: [LocalStorageService],
  templateUrl: './card-versiculos.component.html',
  styleUrls: ['./card-versiculos.component.scss',]
})
export class CardVersiculosComponent {
  @Input({ required: true }) versiculo!: VersiculoViewModel;
  @Input({ required: true }) numerar!: boolean;

  constructor(private localStorage: LocalStorageService, private snack: MatSnackBar) { }

  favoritar(versiculo: VersiculoViewModel) {
    let salvou = this.localStorage.salvarFavorito(versiculo)

    this.snack.open(salvou ? 'Versículo adicionado aos favoritos com sucesso' :
      'Esse versículo já é favorito')

  }
}
