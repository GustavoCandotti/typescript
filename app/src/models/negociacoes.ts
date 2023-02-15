import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";


export class Negociacoes implements Modelo<Negociacoes>  {
    private negociacoes:Array<Negociacao> = []; //private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) { //adicionando valores dentro do array.
        this.negociacoes.push(negociacao);
    }

    public lista():ReadonlyArray<Negociacao> { //apenas leia o array para não modifica-lo.não disponibiliza a remoção ou inclusão de novos items. //lista(): readonly Negociacao[].
       return this.negociacoes; //retornando uma nova lista de negociacoes.
    }

    public paraTexto():string {
        return JSON.stringify(this.negociacoes, null, 2);
    }

    public ehIgual(negociacoes:Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }  //para permiter so add e nao remover elementos da nossa lista.
}



