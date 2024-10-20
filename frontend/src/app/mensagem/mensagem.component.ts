import { Component, Input } from '@angular/core';
import { ModeloMensagem } from './mensagem.model';
import { ServicoMensagens } from './mensagem.service';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css'
})
export class MensagemComponent {

  @Input() modelo : ModeloMensagem = new ModeloMensagem();

  constructor(private servico : ServicoMensagens) {}

  ApagarSelf() {
    this.servico.deletarMensagem(this.modelo)
    .subscribe({
      next: (dadosSucesso: any) => {
        console.log(dadosSucesso.myMsgSucesso);

      },
      error: (dadosErro) => {
        console.log(`$== !!Error (Subscribe): - ${dadosErro.info_extra} ==`);
        console.log(dadosErro);
      }
    });
  }

  EditSelf() {
    this.servico.editarMensagem(this.modelo, "EU QUERO COMER BANANA")
    .subscribe({
      next: (dadosSucesso: any) => {
        console.log(dadosSucesso.myMsgSucesso);
        
        console.log("EDITADO PARA: "+ dadosSucesso.mensagemEditada.content)
        this.servico.editarMensagemServico(this.modelo, dadosSucesso.mensagemEditada)
      },
      error: (dadosErro) => {
        console.log(`$== !!Error (Subscribe): - ${dadosErro.info_extra} ==`);
        console.log(dadosErro);
      }
    });
  }
}
