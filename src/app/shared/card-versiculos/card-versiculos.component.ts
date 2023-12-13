
import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/localStorage/localStorage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../shared.module';
import { CommonModule } from '@angular/common';
import { WhatsappModel, WhatsappService } from 'src/app/services/whatsapp/whatsapp.service';
import { MatDialog } from '@angular/material/dialog';
import { VersiculoViewModel } from 'src/app/models/models';

@Component({
  selector: 'app-card-versiculos',
  standalone: true,
  imports: [SharedModule, CommonModule],
  providers: [LocalStorageService, WhatsappService],
  templateUrl: './card-versiculos.component.html',
  styleUrls: ['./card-versiculos.component.scss',]
})
export class CardVersiculosComponent {
  @Input({ required: true }) versiculo!: VersiculoViewModel;
  @Input({ required: true }) numerar!: boolean;

  constructor(private localStorage: LocalStorageService, private snack: MatSnackBar, private whatsService: WhatsappService) { }

  favoritar(versiculo: VersiculoViewModel) {
    let salvou = this.localStorage.salvarFavorito(versiculo)

    this.snack.open(salvou ? 'Versículo adicionado aos favoritos com sucesso' :
      'Esse versículo já é favorito')
  }

  compartilhar(versiculo: VersiculoViewModel) {

    let dialog = this.whatsService.compartilhar(versiculo)
  }


}
