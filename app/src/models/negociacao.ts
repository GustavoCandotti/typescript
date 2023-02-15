import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {
    //private _data;
    //private _quantidade;
    //private _valor;

    constructor(
        private _data:Date, 
        public readonly quantidade:number, 
        public readonly valor:number
    ) {}
    // this._data = data;
    // this._quantidade = quantidade;
    // this._valor = valor;

    public static criaDe(dataString:string, quantidadeString:string, valorString:string):Negociacao {
        //realiza a conversão de dados em string.
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);
        return new Negociacao(date, quantidade, valor); //valores convertidos.
    } //todo metodo static eu posso chamar diretamente na classe. ex: Negociacao.criaDe

    get data():Date {  //get nao pode ter o mesmo nome da minha propriedade.//consigo acessar com o get.
        const data = new Date(this._data.getTime());
        //Como uma forma de proteger nossa propriedade criamos uma cópia idêntica dela, mas com uma nova referência, sem ser uma referência para _data. Ao fazermos qualquer modificação na data, na verdade estaremos alterando a cópia dela que criamos e não a data que estamos guardando.
        return data;
    }

    get volume():number {
        return this.quantidade * this.valor;
    }

    public paraTexto():string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `;
    }

    public ehIgual(negociacao:Negociacao):boolean {
        return this.data.getDate() === negociacao.data.getDate()
            && this.data.getMonth() === negociacao.data.getMonth()
            && this.data.getFullYear() === negociacao.data.getFullYear()
    } 
}