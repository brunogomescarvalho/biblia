import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';

@Injectable()
export class ServicoHttp {
  private endpoint = 'https://www.abibliadigital.com.br/api';


  constructor(private http: HttpClient) { }

  public ObterLivros() {
    return this.http.get<any>(`${this.endpoint}/books`);
  }

  public ObterDetalhesLivro(abrev: string) {
    return this.http.get<any>(`${this.endpoint}/books/${abrev}`);
  }

  public ObterVersiculoAleatorioDeUmLivro(abrev: string) {
    return this.http.get<any>(`${this.endpoint}/verses/nvi/${abrev}/random`);
  }

  public ObterVersiculoAleatorio() {
    return this.http.get<any>(`${this.endpoint}/verses/nvi/random`);
  }

  public ObterVersiculosPorCapitulo(abrev: string, chapter: number) {
    return this.http
      .get<any>(`${this.endpoint}/verses/nvi/${abrev}/${chapter}}`)
      .pipe(catchError(() => throwError(() => new Error())));
  }

  public ObterVersiculo(abrev: string, chapter: number, numero: number) {
    return this.http.get<any>(
      `${this.endpoint}/verses/nvi/${abrev}/${chapter}/${numero}}`
    );
  }

  public ObterVersiculoPorPalavra(palavra: any) {
    return this.http.post<any>(`${this.endpoint}/verses/search`, palavra);
  }


}
