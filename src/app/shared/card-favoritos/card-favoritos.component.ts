import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { VersiculoViewModel } from '../../models/models';

@Component({
  selector: 'app-card-favoritos',
  templateUrl: './card-favoritos.component.html',
  styleUrls: ['./card-favoritos.component.scss'],

})
export class CardFavoritosComponent {
  @Input({ required: true }) favorito!: VersiculoViewModel

  @Output() onRemover = new EventEmitter<VersiculoViewModel>()

  remover() {
    this.onRemover.emit()
  }
}
