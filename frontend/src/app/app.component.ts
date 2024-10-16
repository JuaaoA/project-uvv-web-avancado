import { Component, ModuleWithComponentFactories } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MensagemComponent } from './mensagem/mensagem.component';
import { ModeloMensagem } from './mensagem/mensagem.model';
import { ListaMensagemComponent } from './lista-mensagem/lista-mensagem.component';
import { InputMensagemComponent } from './input-mensagem/input-mensagem.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MensagemComponent, ListaMensagemComponent, InputMensagemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  bindMessage : ModeloMensagem = new ModeloMensagem("É O MINI DE PAPAI É", "RATINHOOOO")
}
 