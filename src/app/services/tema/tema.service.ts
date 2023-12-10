import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

import { ImagemService } from './imagem.service';

@Injectable()

export class TemaService {

  private renderer!: Renderer2

  private tema: Tema = 'default-theme'

  private localStorageName = 'BibliaTema'

  constructor(private rf: RendererFactory2, private imagemService: ImagemService) {

    this.renderer = this.rf.createRenderer(null, null)
  }

  alterarTema(tema: Tema) {

    this.renderer.removeClass(document.documentElement, this.tema)

    this.tema = tema

    if (this.tema != 'default-theme')
      this.renderer.addClass(document.documentElement, this.tema)

    this.salvarTemaUsuario(this.tema)

    this.imagemService.alterarImagem(this.tema)

  }


  private salvarTemaUsuario(novoTema: Tema) {
    let tema = localStorage.getItem(this.localStorageName)

    tema = novoTema

    localStorage.setItem(this.localStorageName, JSON.stringify({ tema: tema }))
  }

  aplicarTemaUsuario() {
    let tema = localStorage.getItem(this.localStorageName)

    if (tema)
      this.tema = JSON.parse(tema).tema

    this.alterarTema(this.tema)
    this.imagemService.alterarImagem(this.tema)
  }

  obterTemaAtual() {
    let tema = localStorage.getItem(this.localStorageName)

    if (tema)
      return JSON.parse(tema).tema

    else
      return tema
  }


}

export type Tema = 'dark-theme' | 'light-theme' | 'default-theme'


