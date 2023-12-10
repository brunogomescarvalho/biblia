import { Injectable, OnInit } from '@angular/core';
import { VersiculoViewModel } from '../../models/models';

@Injectable()
export class FavoritosService {

  nome: string = 'FavoritosDaBiblia'

  obterFavoritos() {
    let dados = localStorage.getItem(this.nome)
    return dados ? JSON.parse(dados) as VersiculoViewModel[] : []
  }

  salvarFavorito(verse: VersiculoViewModel): boolean {

    let dados = this.obterFavoritos()

    let encontrado = dados.find(x => x.text == verse.text)

    if (encontrado)
      return false

    dados.push(verse)
    localStorage.setItem(this.nome, JSON.stringify(dados))
    return true

  }

  remover(index: number) {
    let dados = this.obterFavoritos()
    dados.splice(index, 1)
    localStorage.setItem(this.nome, JSON.stringify(dados))
  }

}
