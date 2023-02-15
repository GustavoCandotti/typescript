import { domInjector } from "../decorators/dom-injector.js";
import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    @domInjector('#data')
    private inputData:HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade:HTMLInputElement;
    @domInjector('#valor')
    private inputValor:HTMLInputElement;
    private negociacoes:Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona():void {
      const negociacao = Negociacao.criaDe( //usamos metodo static para chamar diretamente da classe.
        this.inputData.value,
        this.inputQuantidade.value,
        this.inputValor.value
      );
      if (!this.ehDiaUtil(negociacao.data)) {
        this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
        return;
      }

      this.negociacoes.adiciona(negociacao); //add negociacao dentro de negociacoes.
      //usamos this pq negociacoes é um atributo.
      imprimir(negociacao, this.negociacoes);
      this.limparFormulario();
      this.atualizaView();
    }

    importaDados(): void {
      this.negociacoesService.obterNegociacoesDoDia()
        .then(negociacoesdeHoje => {
          return negociacoesdeHoje.filter(negociacaoDeHoje => {
            //nao podem ter negociacoes que ja existem na minha lista de negociacoes.
            return !this.negociacoes 
            .lista() //lista voce tem algum some? vc tem alguma negociacao que seja igual a neg.hoje?
            .some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
          }) //se ele encontra a primeira coisa verdadeira, ele retorna verdade.
        })
        .then(negociacoesDeHoje => {
            for(let negociacao of negociacoesDeHoje) {
            this.negociacoes.adiciona(negociacao);
          }
        });
    }

    private ehDiaUtil(data:Date) {
      return data.getDay() > DiasDaSemana.DOMINGO 
      && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario():void {
        this.inputData.value = "";
        this.inputQuantidade.value = "";
        this.inputValor.value = "";
        this.inputData.focus(); //faz voltar no elemento inicial.
    }

    private atualizaView():void {
      this.negociacoesView.update(this.negociacoes);
      this.mensagemView.update('Negociação adicionada com sucesso');
    }

}