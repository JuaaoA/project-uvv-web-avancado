import { inject, Injectable, Input, Output, EventEmitter, ModuleWithComponentFactories } from "@angular/core";
import { ModeloMensagem } from "./mensagem.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, BehaviorSubject } from "rxjs";
import { routes } from "../app.routes";

@Injectable({providedIn: 'root'})
export class ServicoMensagens {
    private todasMensagens : ModeloMensagem[] = [new ModeloMensagem("teste", "123")]

    constructor() {}

    adicionarMensagem(mensagem : ModeloMensagem) {
        this.todasMensagens.push(mensagem)
        
    }

    deletarMensagem(mensagem : ModeloMensagem) {
        this.todasMensagens.splice(this.todasMensagens.indexOf(mensagem), 1)
    }

    editarMensagem(target : ModeloMensagem, novaMensagem : string)
    {
        this.todasMensagens[this.todasMensagens.indexOf(target)].conteudo = novaMensagem;
    }

    getMensagens()
    {
        return this.todasMensagens;
    }
}