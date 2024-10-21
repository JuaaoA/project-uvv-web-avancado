import { Component, Input } from '@angular/core';
import { ModeloMensagem } from './mensagem.model';
import { ServicoMensagens } from './mensagem.service';
import { NgClass } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.css'
})
export class MensagemComponent {

  @Input() modelo : ModeloMensagem = new ModeloMensagem();

  public estaEditando : Boolean = false;

  constructor(private servico : ServicoMensagens) {}

  onSubmit(form : NgForm)
  {
    // Pegar a mensagem que foi editada no formulario
    const valor = form.value.formMensagemEditada

    // Verificar se o campo não está vazio
    if (valor == "")
    {
      return;
    }

    // Confirmar edição
    this.EditSelf(valor);

    // Tirar Campo Mensagem
    this.ToggleEdit();
  }

  ToggleEdit() {
    this.estaEditando = !this.estaEditando;
  }

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

  EditSelf(mensagemNova : string) {
    this.servico.editarMensagem(this.modelo, mensagemNova)
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
