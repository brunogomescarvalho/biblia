import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VersiculoViewModel } from 'src/app/models/models';
import { WhatsappService } from 'src/app/services/whatsapp/whatsapp.service';

import { LocalStorageService } from '../../services/localStorage/localStorage.service';
import { SharedModule } from '../shared.module';


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

  async compartilhar(versiculo: VersiculoViewModel) {
    await this.whatsService.compartilhar(versiculo)
  }

  enviarPorWhatsapp(versiculo: VersiculoViewModel) {
    this.whatsService.enviarPorWhatsApp(versiculo)
  }
}
