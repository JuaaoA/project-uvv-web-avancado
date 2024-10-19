import { Component, ModuleWithComponentFactories } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MensagemComponent } from './mensagem/mensagem.component';
import { ModeloMensagem } from './mensagem/mensagem.model';
import { ListaMensagemComponent } from './lista-mensagem/lista-mensagem.component';
import { InputMensagemComponent } from './input-mensagem/input-mensagem.component';
import { ServicoMensagens } from './mensagem/mensagem.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MensagemComponent, ListaMensagemComponent, InputMensagemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ServicoMensagens]
})
export class AppComponent {
  constructor(private mensagensService : ServicoMensagens) {}
}
 