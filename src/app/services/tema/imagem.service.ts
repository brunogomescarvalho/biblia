import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()

export class ImagemService {
  private alterarCorImagens: BehaviorSubject<string>

  private imagensDefault = new Map<string, string>();
  private imagensLight = new Map<string, string>();
  private imagensDark = new Map<string, string>();

  constructor() {
    this.alterarCorImagens = new BehaviorSubject<string>('default-theme');

    this.imagensDefault.set('dash', '../../../assets/dash-default.svg'),
      this.imagensLight.set('three', '../../../assets/three-light.svg')

    this.imagensDark.set('dash', '../../../assets/dash-dark.svg')

    this.imagensLight.set('dash', '../../../assets/dash-light.svg')
  }


  obterImagem(tema: string, nome: string) {

    let grupo: Map<string, string>;

    switch (tema) {
      case 'light-theme': grupo = this.imagensLight; break
      case 'dark-theme': grupo = this.imagensDark; break
      default: grupo = this.imagensDefault; break
    }

    return grupo.get(nome)
  }

  alterarImagem(tema: string) {
    this.alterarCorImagens.next(tema)
  }

  imagemAlterada() {
    return this.alterarCorImagens.asObservable()
  }


}
export type Temas = 'dark-theme' | 'light-theme' | 'default-theme'
