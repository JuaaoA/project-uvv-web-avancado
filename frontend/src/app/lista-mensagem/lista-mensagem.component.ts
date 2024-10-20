import { Component, inject, OnInit, ChangeDetectorRef, input, Input } from '@angular/core';
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
  
})

export class ListaMensagemComponent implements OnInit {

  //private servico = inject(ServicoMensagens);

  constructor(public servico : ServicoMensagens, private alteracao : ChangeDetectorRef) {}
  
  @Input() messageslist : ModeloMensagem[] = []

  ngOnInit(): void {
      this.servico.getMessages()
        .subscribe({
          next: (dadosSucesso: any) => {
            console.log(dadosSucesso.myMsgSucesso);
            console.log({conteudo: dadosSucesso.objSMessageSRecuperadoS[0].conteudo});
            console.log({id: dadosSucesso.objSMessageSRecuperadoS[0].messageId});
            
            this.servico.setMensagens(dadosSucesso.objSMessageSRecuperadoS);

            this.messageslist = dadosSucesso.objSMessageSRecuperadoS;
          },
          error: (dadosErro) => {
            console.log(`$== !!Error (subscribe): ${dadosErro.info_extra} ==`);
            console.log(dadosErro);
          }
        });
    
    setInterval(() => {
      this.messageslist = this.servico.getMensagens();
    }, 800)
  }
}
