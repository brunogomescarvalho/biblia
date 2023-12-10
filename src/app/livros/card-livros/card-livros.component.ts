import { Component, Input } from '@angular/core';
import { Livro } from '../../models/models';

@Component({
  selector: 'app-card-livros',
  templateUrl: './card-livros.component.html',
  styleUrls: ['./card-livros.component.scss']
})
export class CardLivrosComponent {
  @Input({ required: true }) livro?: Livro
}
