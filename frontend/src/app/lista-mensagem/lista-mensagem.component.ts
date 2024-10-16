import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModeloMensagem } from '../mensagem/mensagem.model';
import { MensagemComponent } from '../mensagem/mensagem.component';
import { ServicoMensagens } from '../mensagem/mensagem.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-mensagem',
  standalone: true,
  imports: [MensagemComponent],
  templateUrl: './lista-mensagem.component.html',
  styleUrl: './lista-mensagem.component.css',
  providers: [ServicoMensagens],
})

export class ListaMensagemComponent implements OnInit {

  //private servico = inject(ServicoMensagens);

  constructor(public servico : ServicoMensagens) {}

  messageslist : ModeloMensagem[] = []

  ngOnInit(): void {
      this.messageslist = this.servico.getMensagens();
  }
}
