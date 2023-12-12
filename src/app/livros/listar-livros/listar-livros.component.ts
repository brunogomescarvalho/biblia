import { Observable, first, map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Livro } from '../../models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html',
  styleUrls: ['./listar-livros.component.scss']
})
export class ListarLivrosComponent implements OnInit {
  livros$!: Observable<Livro[]>
  grade = true
  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.livros$ = this.route.data.pipe(map(x => x['livros']))
      .pipe(first())

    window.addEventListener("resize", this.alterarGradeMobile);
  }
  alterarGradeMobile() {
    this.grade = window.innerWidth <= 768
  }

  alterarGrade() {
    this.grade = !this.grade
  }

  irParaLivro(livro: Livro) {
    this.router.navigate(["/capitulos/livro", livro.abbrev.pt, 1, livro.chapters])
  }

}
