import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VersiculoViewModel } from "../models/models";
import { LocalStorageService } from "../services/favoritos/localStorage.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnInit {
  favoritos?: VersiculoViewModel[];

  grade: boolean = true

  constructor(
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private favoritoService: LocalStorageService) { }

  ngOnInit(): void {
    this.favoritos = this.route.snapshot.data['favoritos'];

    if (this.favoritos?.length == 0) this.snack.open('Nenhum favorito até o momento');
  }

  remover(favorito: VersiculoViewModel) {
    this.favoritoService.remover(favorito)

    let index = this.favoritos?.findIndex(x => x.text == favorito.text)

    this.favoritos?.splice(index!, 1)

    this.snack.open('Favorito removido com sucesso');
  }

  alterarGradeMobile() {
    this.grade = window.innerWidth <= 768
  }

  alterarGrade() {
    this.grade = !this.grade
  }
}
