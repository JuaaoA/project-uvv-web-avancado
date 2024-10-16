import { inject, Injectable } from "@angular/core";
import { ModeloMensagem } from "./mensagem.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";

@Injectable()
export class ServicoMensagens {
    private todasMensagens : ModeloMensagem[] = []

    adicionarMensagem(mensagem : ModeloMensagem) {
        this.todasMensagens.push(mensagem)
        alert("mensagem adicionada!" + mensagem.conteudo)
    }

    deletarMensagem(mensagem : ModeloMensagem) {
        this.todasMensagens.splice(this.todasMensagens.indexOf(mensagem), 1)
    }

    getMensagens()
    {
        return this.todasMensagens;
    }
}