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
})
export class InputMensagemComponent {
  private servico = inject(ServicoMensagens);

  @Output() newMessageEvent = new EventEmitter<string>();

  onSubmit(form: NgForm)
  {
    const mensagemCriada = new ModeloMensagem(form.value.formMensagem, form.value.formAutor, form.value.formGender, form.value.formAge, form.value.formColor)

    this.servico.adicionarMensagem(mensagemCriada)
      .subscribe({
        next: (dadosSucesso: any) => {
          console.log(dadosSucesso.myMsgSucesso);
          console.log({content: dadosSucesso.objMessageSave.content});
          console.log({_id: dadosSucesso.objMessageSave._id});
        },
        error: (dadosErro) => {
          console.log(`$== !!Error (Subscribe): - ${dadosErro.info_extra} ==`);
          console.log(dadosErro);
        }
      });
    
    form.controls['formMensagem'].reset();
  }
}
