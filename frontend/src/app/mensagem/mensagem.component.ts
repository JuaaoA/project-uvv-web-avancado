import { Component, Input } from '@angular/core';
import { ModeloMensagem } from './mensagem.model';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css'
})
export class MensagemComponent {

  @Input() modelo : ModeloMensagem = new ModeloMensagem();
}
