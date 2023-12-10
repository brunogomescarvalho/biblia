export class ObterCapituloViewModel {
  book?: Livro
  chapter?: Capitulo
  verses?: Versiculo[]
}


export class VersiculoViewModel{
  book?:Livro
  chapter?:number
  number?:number
  text?:string
}

export class Livro {
  abbrev: any
  author?: string
  chapters?: number
  group?: string
  name?: string
  testament?: string
}

export class ObterVersiculosPorPalavra {
  occurrence?: number
  verses?: VersiculoViewModel[]
}

export class Capitulo {
  number?: number
  verses?: number
}

export class Versiculo {
  number?: number
  text?: string
}



