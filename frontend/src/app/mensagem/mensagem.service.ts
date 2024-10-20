import { inject, Injectable, Input, Output, EventEmitter, ModuleWithComponentFactories } from "@angular/core";
import { ModeloMensagem } from "./mensagem.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, BehaviorSubject, map } from "rxjs";
import { routes } from "../app.routes";
import { MensagemComponent } from "./mensagem.component";

@Injectable({providedIn: 'root'})
export class ServicoMensagens {
    private baseUrl = "http://localhost:3000";

    private todasMensagens : ModeloMensagem[] = [];

    private http = inject(HttpClient);

    constructor() {}

    errorHandler(e: any, info: string): Observable<any> {
        throw({
            info_extra: info,
            error_SS: e,
            error_CS: "Client-Side, deu ruim patrão"
        })
    }

    adicionarMensagemServico(mensagem : ModeloMensagem)
    {
        this.todasMensagens.push(mensagem)
    }

    adicionarMensagem(mensagem : ModeloMensagem) {
        return this.http.post<any>(`${this.baseUrl}/message`, mensagem).pipe(
            catchError((e) => this.errorHandler(e, "adicionarMensagem()"))
        );
    }

    deletarMensagem(mensagem : ModeloMensagem) {
        this.todasMensagens.splice(this.todasMensagens.indexOf(mensagem), 1);

        return this.http.post<any>(`${this.baseUrl}/message/delete`, mensagem).pipe(
            catchError((e) => this.errorHandler(e, "deletarMensagem()"))
        )
    }

    editarMensagemServico(old : ModeloMensagem, target: any) {
        // Editar a mensagem pelo frontend
        this.todasMensagens[this.todasMensagens.indexOf(old)].conteudo = target.content;
    }

    editarMensagem(target : ModeloMensagem, novaMensagem : string) {

        // Editar o modelo da mensagem antes de enviá-la para o backend
        target.conteudo = novaMensagem;

        return this.http.patch<any>(`${this.baseUrl}/message/edit`, target).pipe(
            catchError((e) => this.errorHandler(e, "editarMensagem()"))
        )
    }

    getMensagens()
    {
        return this.todasMensagens;
    }

    setMensagens(newMensagens: ModeloMensagem[])
    {
        this.todasMensagens = newMensagens;
    }

    getMessages() : Observable<any>
    {
        return this.http.get<any>(`${this.baseUrl}/message`).pipe(
            map((responseRecebida : any) => {
                console.log(responseRecebida);
                console.log({conteudo: responseRecebida.objSMessageSRecuperadoS[0].content});
                console.log({_id: responseRecebida.objSMessageSRecuperadoS[0]._id});

                const messageSResponseRecebida = responseRecebida.objSMessageSRecuperadoS;

                let transformedCastMessagesModelFrontend: ModeloMensagem[] = [];
                for (let msg of messageSResponseRecebida) {
                    transformedCastMessagesModelFrontend.push(
                        new ModeloMensagem(msg.content, msg.user, msg.gender, msg.age, msg.color,msg.icone, msg._id));
                }

                responseRecebida.objSMessageSRecuperadoS = [...transformedCastMessagesModelFrontend]

                console.log({myMsgSucesso: responseRecebida.myMsgSucesso});
                console.log({conteudo: responseRecebida.objSMessageSRecuperadoS[0].content})
                console.log({id: responseRecebida.objSMessageSRecuperadoS[0].messageId})

                return responseRecebida;
            }),
            catchError((e) => this.errorHandler(e, "getMessages()"))
        )
    }
}