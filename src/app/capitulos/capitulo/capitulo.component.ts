import { Component, ElementRef, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ObterCapituloViewModel, VersiculoViewModel } from '../../models/models';
import { ServicoHttp } from '../../services/http/http.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-capitulo',
  templateUrl: './capitulo.component.html',
  styleUrls: ['./capitulo.component.scss']
})
export class CapituloComponent
  implements OnInit {

  detalhes?: ObterCapituloViewModel
  versiculos?: VersiculoViewModel[]
  btnProximoDesativado: boolean = false
  btnAnteriorDesativado: boolean = false
  observableVersiculos?: Observable<ObterCapituloViewModel>

  grade = true

  constructor(
    private route: ActivatedRoute,
    private service: ServicoHttp,
    private router: Router,
    private snack: MatSnackBar,
    private el: ElementRef) { }

  ngOnInit(): void {
    let detalhes = this.route.snapshot.data['detalhes']
    let capitulo = parseInt(this.route.snapshot.params['capitulo'])
    let total = parseInt(this.route.snapshot.params['total'])

    if (!detalhes) {
      this.snack.open(`O livro contém ${total} capitulos`)
      this.router.navigate(["capitulos"], { relativeTo: this.route.parent })
      return
    }
    this.alterarBtnAtivado(capitulo, total)
    this.detalhes = detalhes

    this.mapearVersiculos();

    window.addEventListener("resize", this.alterarGradeMobile);

  }


  proximo() {
    let livro = this.route.snapshot.params['livro']
    let capitulo = parseInt(this.route.snapshot.params['capitulo'])
    capitulo++

    this.mudarPagina(livro, capitulo);
  }

  anterior() {
    let livro = this.route.snapshot.params['livro']
    let capitulo = parseInt(this.route.snapshot.params['capitulo'])
    capitulo--

    this.mudarPagina(livro, capitulo);
  }

  private mudarPagina(livro: any, capitulo: number) {

    let total = parseInt(this.route.snapshot.params['total'])
    this.alterarBtnAtivado(capitulo, total)

    this.service.ObterVersiculosPorCapitulo(livro, capitulo)
      .pipe(take(1))
      .subscribe(dados => {
        this.router.navigate(["livro", livro, capitulo, total], { relativeTo: this.route.parent });
        this.detalhes = dados;
        this.mapearVersiculos();
        this.scrollAoTopo()
      });
  }

  private mapearVersiculos() {
    this.versiculos = this.detalhes?.verses?.map(x => {
      let verse = new VersiculoViewModel();
      verse.book = this.detalhes?.book;
      verse.chapter = this.detalhes?.chapter?.number;
      verse.text = x.text;
      verse.number = x.number;

      return verse;

    });
  }

  private alterarBtnAtivado(capitulo: number, totalCapitulos: number) {

    this.btnProximoDesativado = capitulo == totalCapitulos

    this.btnAnteriorDesativado = capitulo == 1
  }

  scrollAoTopo() {
    this.el.nativeElement.querySelector('#titulo')
      .scrollIntoView({ behavior: 'smooth' });
  }

  alterarGradeMobile() {
    this.grade = window.innerWidth <= 768
  }

  alterarGrade() {
    this.grade = !this.grade
  }
}

