import { Component, OnInit } from '@angular/core';
import { ImagemService } from '../services/tema/imagem.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  imagemDash?: string;

  constructor(private imagemService: ImagemService) { }

  ngOnInit(): void {
    this.imagemService.imagemAlterada()
      .subscribe(x => {
        this.imagemDash = this.imagemService.obterImagem(x, 'dash')
      })
  }
}
