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
    this.servico.deletarMensagem(this.modelo);
  }

  EditSelf() {
    this.servico.editarMensagem(this.modelo, "EU QUERO COMER BANANA")
  }
}
