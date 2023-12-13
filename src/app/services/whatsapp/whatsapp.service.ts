
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VersiculoViewModel } from 'src/app/models/models';

import { WhatsappDialogComponent } from './whatsapp-dialog/whatsapp-dialog.component';
import { CryptoService } from './whatsapp-crypto.service';

@Injectable()
export class WhatsappService {
  constructor(public dialog: MatDialog, public serviceCrypto: CryptoService) { }

  contatosLocalStorage = 'contatosBiblia';


  private obterWebLink(data: WhatsappModel) {
    return `https://web.whatsapp.com/send?phone=${data.numero
      }&text=${encodeURIComponent(data.msg)}`;
  }

  private obterDesktopLink(data: WhatsappModel) {
    return `https://wa.me/${data.numero}?text=${encodeURIComponent(data.msg)}`;
  }

  private enviarPorWhatsApp(data: WhatsappModel, ehWeb = false): void {
    let link = ehWeb ? this.obterWebLink(data) : this.obterDesktopLink(data);
    window.open(link, '_blank');
  }

  obterContatos() {
    let dados = localStorage.getItem(this.contatosLocalStorage);

    if (!dados)
      return []

    let contatos = (JSON.parse(dados) as ContatoModel[])

    return contatos

  }

  salvarContato(contato: ContatoModel) {

    if (!this.telefoneEhValido(contato.telefone)) return { sucesso: false, motivo: 'Telefone Inválido' };

    let dados = this.obterContatos();

    if (dados.length > 0) {
      let index = dados.findIndex((x) => x.telefone == contato.telefone);

      if (index != -1) return { sucesso: false, motivo: 'Número de contato já cadastrado' };
    }

    // contato.telefone = this.serviceCrypto.encryptPhoneNumber(contato.telefone)

    dados.push(contato);

    localStorage.setItem(this.contatosLocalStorage, JSON.stringify(dados));

    return { sucesso: true, motivo: 'Contato salvo com sucesso!' };
  }

  telefoneEhValido(telefone: string) {
    const regex = /^(55)[0-9]{2}[0-9]{9}$/;

    return regex.test(telefone);
  }

  compartilhar(versiculo: VersiculoViewModel) {
    return this.dialog.open(WhatsappDialogComponent, {
      data: versiculo,
    });
  }

  enviarMensagem(telefone: string, versiculo: VersiculoViewModel) {

    let livro = versiculo.book?.abbrev.pt;
    let capitulo = versiculo.chapter;
    let verso = versiculo.number;

    let whatsapp: WhatsappModel = {
      msg: `https://bibliadogui.onrender.com/versiculos/pesquisa/${livro}/${capitulo}/${verso}`,
      numero: telefone,
    };

    this.enviarPorWhatsApp(whatsapp);
  }

  removerContatos() {
    localStorage.removeItem(this.contatosLocalStorage)
  }
}

export interface WhatsappModel {
  numero: string;
  msg: string;
}

export interface ContatoModel {
  nome: string;
  telefone: string;
}
