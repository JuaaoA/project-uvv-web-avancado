import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ServicoMensagens } from '../mensagem/mensagem.service';
import { ModeloMensagem } from '../mensagem/mensagem.model';

@Component({
  selector: 'app-input-mensagem',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-mensagem.component.html',
  styleUrl: './input-mensagem.component.css',
  providers: [ServicoMensagens]
})
export class InputMensagemComponent {
  private servico = inject(ServicoMensagens);

  onSubmit(form: NgForm)
  {
    const mensagemCriada = new ModeloMensagem(form.value.formMensagem, form.value.formAutor)

    this.servico.adicionarMensagem(mensagemCriada);
  
    form.resetForm();
  } 
}
