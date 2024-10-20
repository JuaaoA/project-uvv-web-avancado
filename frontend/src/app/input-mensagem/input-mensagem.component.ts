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
    // Verificar se o usuário não colocou algumas infos
    if (form.value.formGender == "") {
      form.value.formGender = "?";
    }

    if (form.value.formAge == "") {
      form.value.formAge = "?";
    }

    // foto do macaco é o padrão
    if (form.value.formIcon == "") {
      form.value.formIcon = "3";
    }

    // Cria o modelo da mensagem
    const mensagemCriada = new ModeloMensagem(form.value.formMensagem, form.value.formAutor, form.value.formGender, form.value.formAge, form.value.formColor, form.value.formIcon)

    // Adiciona a mensagem ao banco de dados
    this.servico.adicionarMensagem(mensagemCriada)
      .subscribe({
        next: (dadosSucesso: any) => {
          console.log(dadosSucesso.myMsgSucesso);
          console.log({content: dadosSucesso.messageSave.content});
          console.log({_id: dadosSucesso.messageSave._id});
          
          const save = dadosSucesso.messageSave;

          this.servico.adicionarMensagemServico(new ModeloMensagem(
            save.content,
            save.user,
            save.gender,
            save.age,
            save.color,
            save.icone,
            save._id
          ))
        },
        error: (dadosErro) => {
          console.log(`$== !!Error (Subscribe): - ${dadosErro.info_extra} ==`);
          console.log(dadosErro);
        }
      });
    
    form.controls['formMensagem'].reset();
  }
}
