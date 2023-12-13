import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ContatoModel, WhatsappService } from '../whatsapp.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-whatsapp-dialog',
  templateUrl: './whatsapp-dialog.component.html',
  styleUrls: ['./whatsapp-dialog.component.scss']
})
export class WhatsappDialogComponent implements OnInit {
  constructor(private snack: MatSnackBar, private serviceWhats: WhatsappService, public dialogRef: MatDialogRef<WhatsappDialogComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any) { }

  contatos!: ContatoModel[]
  contatoSelecionado?: ContatoModel

  nome?: string
  telefone?: string

  form!: FormGroup

  panelOpenState = false

  ngOnInit(): void {
    this.contatos = this.serviceWhats.obterContatos()

  }

  salvarContato() {

    let contato: ContatoModel = {
      nome: this.nome!,
      telefone: this.telefone!
    }

    let salvou = this.serviceWhats.salvarContato(contato)

    if (salvou.sucesso == true) {
      this.contatos = this.serviceWhats.obterContatos()
      this.panelOpenState = false
      this.contatoSelecionado = this.contatos.find(x => x.telefone == contato.telefone)
    }

    else
      this.snack.open(salvou.motivo)

  }

  compartilhar() {
    if (this.telefone && this.serviceWhats.telefoneEhValido(this.telefone)) {
      this.serviceWhats.enviarMensagem(this.telefone, this.data)
      this.dialogRef.close()
    }
    else if (this.contatoSelecionado) {
      this.serviceWhats.enviarLink(this.contatoSelecionado.telefone, this.data)
      this.dialogRef.close()
    }

    else {
      this.snack.open('Selecione um contato ou informe o número')
    }
  }

  removerContatos() {
    this.serviceWhats.removerContatos()
    this.contatos = []
    this.snack.open("Contatos removidos com sucesso")
  }
}

