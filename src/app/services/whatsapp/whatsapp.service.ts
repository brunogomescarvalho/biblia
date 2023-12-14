
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VersiculoViewModel } from 'src/app/models/models';


@Injectable()
export class WhatsappService {
  constructor(public dialog: MatDialog) { }

  async compartilhar(versiculo: VersiculoViewModel) {

    let msg = this.obterMensagem(versiculo)

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bíblia do Gui',
          text: 'Estou compartilhando o link de uma página com um versículo biblico',
          url: this.obterLink(versiculo)
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else
      this.enviarPorWhatsApp(versiculo)


  }

  private obterLink(versiculo: VersiculoViewModel) {

    let livro = versiculo.book?.abbrev.pt;
    let capitulo = versiculo.chapter;
    let verso = versiculo.number;

    return `https://bibliadogui.onrender.com/versiculos/pesquisa/${livro}/${capitulo}/${verso}`

  }

  private obterMensagem(versiculo: VersiculoViewModel) {
    let capitulo = versiculo.chapter;
    let verso = versiculo.number;

    return `Olá, gostaria de compartilhar um verso bíblico com você.\n\n${versiculo.text}\n\n${versiculo.book?.name} ${capitulo}:${verso}\n`

  }

  public enviarPorWhatsApp(versiculo: VersiculoViewModel): void {
    let msg = this.obterMensagem(versiculo)

    let link = `https://wa.me/?text=${encodeURIComponent(msg)}`
    window.open(link, '_blank');
  }
}

