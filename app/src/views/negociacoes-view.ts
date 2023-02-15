import { escapar } from "../decorators/escapar.js";
import { Negociacoes } from "../models/negociacoes.js";
import { View } from "./view.js";

export class NegociacoesView extends View<Negociacoes> {  //criamos para gerar uma string html e atribuirmos os dados.

    @escapar
    template(model:Negociacoes):string {  //declarar o template da minha view.
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                </tr>
            </thead>
            <tbody>
                ${model.lista().map(negociacao => { //nova lista, mapeia as novas informações.
                    return `
                        <tr>
                            <td>${this.formatar(negociacao.data)}</td>
                            <td>${negociacao.quantidade}</td>
                            <td>${negociacao.valor}</td>
                        </tr>
                    `
                }).join('')}
            </tbody>
        </table>
        `
    }
    
    private formatar(data:Date):string { //apenas essa classe consegue acessar.
        return new Intl.DateTimeFormat().format(data);
    }
}

