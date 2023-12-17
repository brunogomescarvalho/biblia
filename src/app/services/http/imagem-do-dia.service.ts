import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import translate from 'translate';

@Injectable({
  providedIn: 'root'
})
export class ImagemDoDiaService {

  private endpoint = `https://api.nasa.gov/planetary/apod?api_key=${environment.nasaKey}`

  constructor(private httpClient: HttpClient) { }


  public obterImagemDoDia() {
    return this.httpClient.get(this.endpoint)
      .pipe(
        switchMap(async (x: any) => {
          const [translatedTitle, translatedExplanation] = await Promise.all([
            translate(x.title, 'pt'),
            translate(x.explanation, 'pt'),
          ]);
          return {
            copyright: x.copyright,
            date: x.date,
            title: translatedTitle,
            explanation: translatedExplanation,
            url: x.url,
            hdurl: x.hdurl
          } as ImagemDoDia;
        })
      );
  }

}

export interface ImagemDoDia {

  copyright: string
  date: string
  explanation: string
  hdurl: string
  media_type: string
  service_version: string
  title: string
  url: string
}

