import { Injectable } from '@angular/core';

import { Livro, VersiculoViewModel } from '../../models/models';
import { ImagemDoDia } from '../http/imagem-do-dia.service';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  private nome: string = 'FavoritosDaBiblia';
  private cacheLivros: string = 'cachebiblia';
  private cacheSalmo: string = 'salmoDoDia';
  private imagemDoDia: string = 'imagemDoDiaBiblia';

  obterFavoritosOrdenado() {
    let dados = localStorage.getItem(this.nome);

    return dados
      ? (Array.from(JSON.parse(dados)).reverse() as VersiculoViewModel[])
      : [];
  }

  obterFavoritos() {
    let dados = localStorage.getItem(this.nome);

    return dados ? (Array.from(JSON.parse(dados)) as VersiculoViewModel[]) : [];
  }

  ehFavorito(verse: VersiculoViewModel) {
    return (
      this.obterFavoritosOrdenado().findIndex((x) => x?.text == verse?.text) !=
      -1
    );
  }

  salvarFavorito(verse: VersiculoViewModel): boolean {
    let dados = this.obterFavoritos();

    let encontrado = dados.find((x) => x.text == verse.text);

    if (encontrado) return false;

    dados.push(verse);
    localStorage.setItem(this.nome, JSON.stringify(dados));
    return true;
  }

  remover(verse: VersiculoViewModel) {
    let dados = this.obterFavoritos();
    let index = dados.findIndex((x) => x.text == verse.text);
    dados.splice(index, 1);
    localStorage.setItem(this.nome, JSON.stringify(dados));
  }

  salvarLivros(dados: Livro[]) {
    localStorage.setItem(this.cacheLivros, JSON.stringify(dados));
  }

  obterLivros() {
    let infos = localStorage.getItem(this.cacheLivros);

    return infos ? JSON.parse(infos) : null;
  }

  salvarSalmoDoDia(verse: VersiculoViewModel) {
    let salmoDoDia = {
      salmo: verse,
      data: new Date(),
    };
    localStorage.setItem(this.cacheSalmo, JSON.stringify(salmoDoDia));
  }

  obterSalmo() {
    let salmo = localStorage.getItem(this.cacheSalmo);

    if (!salmo) return null;

    let salmoObj = JSON.parse(salmo) as any;

    const dataSalmo = new Date(salmoObj.data);

    if (dataSalmo.getDate() == new Date().getDate()) return salmoObj.salmo;

    return null;
  }

  validarSalmo(salmo: VersiculoViewModel) {
    let primeiraLetra = salmo.text![0];

    let ultimaLetra = salmo.text![salmo.text?.length! - 1];

    return primeiraLetra == primeiraLetra.toUpperCase() && ultimaLetra == '.';
  }

  obterImagemDia() {
    let dados = localStorage.getItem(this.imagemDoDia);

    if (!dados) return null;

    let imagem = JSON.parse(dados) as ImagemDoDia;

    let dataAtual = new Date();

    if (new Date(imagem.date).getDate() + 1 == dataAtual.getDate())
      return imagem;

    if (dataAtual.getHours() < 5) return imagem;

    return null;
  }

  salvarImagemDoDia(imagem: ImagemDoDia) {
    localStorage.setItem(this.imagemDoDia, JSON.stringify(imagem));
  }

  getLocalStorageSizeInfo() {
    const totalBytes = new TextEncoder().encode(
      JSON.stringify(localStorage)
    ).length;
    const maxSizeBytes = 5 * 1024 * 1024;

    return {
      totalBytes,
      maxSizeBytes,
      usedPercentage: (totalBytes / maxSizeBytes) * 100,
    };
  }
}
