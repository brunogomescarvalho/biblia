import { Component, EventEmitter, Input, Output } from '@angular/core';

import { VersiculoViewModel } from '../../models/models';
import { WhatsappService } from 'src/app/services/whatsapp/whatsapp.service';

@Component({
  selector: 'app-card-favoritos',
  templateUrl: './card-favoritos.component.html',
  styleUrls: ['./card-favoritos.component.scss'],

})
export class CardFavoritosComponent {

  constructor( private whatsService: WhatsappService){}

  @Input({ required: true }) favorito!: VersiculoViewModel

  @Output() onRemover = new EventEmitter<VersiculoViewModel>()

  compartilhar(versiculo: VersiculoViewModel) {
    this.whatsService.compartilhar(versiculo)
  }

  remover() {
    this.onRemover.emit()
  }
}
