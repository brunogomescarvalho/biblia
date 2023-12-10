import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadingService } from '../services/loading/loadingService';
import { Tema, TemaService } from '../services/tema/tema.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],

})
export class ShellComponent implements OnInit {

  mostrarCarregamento$!: Observable<boolean>

  temaAtual?: Tema

  constructor(private loadingService: LoadingService, private temaService: TemaService) { }

  ngOnInit(): void {
    this.temaAtual = this.temaService.obterTemaAtual()

    this.mostrarCarregamento$ = this.loadingService.estaCarregando()

  }
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  alterarTema() {

    let novoTema: Tema;

    switch (this.temaAtual) {
      case 'default-theme': novoTema = 'dark-theme'; break
      case 'dark-theme': novoTema = 'light-theme'; break
      default: novoTema = 'default-theme'; break
    }

    this.temaAtual = novoTema

    this.temaService.alterarTema(this.temaAtual)
  }


}
