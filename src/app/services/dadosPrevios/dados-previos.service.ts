import { Injectable, OnInit } from '@angular/core';
import { Livro, VersiculoViewModel } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class DadosPreviosService {

  livros: Livro[] = []

  private cacheLivros: string = 'cachebiblia'
  private cacheSalmo: string = 'salmoDoDia'

  salvarCache(dados: Livro[]) {
    localStorage.setItem(this.cacheLivros, JSON.stringify(dados))
  }

  obterCache() {
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
}
