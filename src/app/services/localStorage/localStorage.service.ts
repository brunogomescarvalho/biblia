import { Injectable, OnInit } from '@angular/core';
import { Livro, VersiculoViewModel } from '../../models/models';

@Injectable()
export class LocalStorageService {

  private nome: string = 'FavoritosDaBiblia'
  private cacheLivros: string = 'cachebiblia'
  private cacheSalmo: string = 'salmoDoDia'

  obterFavoritosOrdenado() {
    let dados = localStorage.getItem(this.nome)

    return dados ? Array.from(JSON.parse(dados)).reverse() as VersiculoViewModel[] : []
  }

  obterFavoritos() {
    let dados = localStorage.getItem(this.nome)

    return dados ? Array.from(JSON.parse(dados)) as VersiculoViewModel[] : []
  }

  ehFavorito(verse: VersiculoViewModel) {
    return this.obterFavoritosOrdenado().findIndex(x => x?.text == verse?.text) != -1
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

  remover(verse: VersiculoViewModel) {
    let dados = this.obterFavoritos()
    let index = dados.findIndex(x => x.text == verse.text)
    dados.splice(index, 1)
    localStorage.setItem(this.nome, JSON.stringify(dados))
  }



  salvarLivros(dados: Livro[]) {
    localStorage.setItem(this.cacheLivros, JSON.stringify(dados))
  }

  obterLivros() {
    let infos = localStorage.getItem(this.cacheLivros);

    return infos ? JSON.parse(infos) : null
  }

  salvarSalmoDoDia(verse: VersiculoViewModel) {

    let salmoDoDia = {
      salmo: verse,
      data: new Date()
    }
    localStorage.setItem(this.cacheSalmo, JSON.stringify(salmoDoDia))
  }

  obterSalmo() {
    let salmo = localStorage.getItem(this.cacheSalmo);

    if (salmo) {
      let salmoObj = JSON.parse(salmo) as any

      const dataSalmo = new Date(salmoObj.data)

      if (dataSalmo.getDate() != new Date().getDate())
        return null

      return salmoObj.salmo

    }

    return null

  }

  validarSalmo(salmo: VersiculoViewModel) {
    let primeiraLetra = salmo.text![0]

    let ultimaLetra = salmo.text![salmo.text?.length! - 1]

    return primeiraLetra == primeiraLetra.toUpperCase() && ultimaLetra == '.'

  }

  getLocalStorageSizeInfo() {
    const totalBytes = new TextEncoder().encode(JSON.stringify(localStorage)).length;
    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB é um valor comum, mas pode variar

    return {
      totalBytes,
      maxSizeBytes,
      usedPercentage: (totalBytes / maxSizeBytes) * 100,
    };
  }

}
