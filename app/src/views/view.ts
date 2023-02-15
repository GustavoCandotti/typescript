export abstract class View<T> {
    //classes abstracts não podem ser instanceadas diretamente. Toda classe abstrata ela pode ter nenhum ou mais metodos abstratos.
    protected elemento:HTMLElement;
    //protected: apenas minhas filhas podem acessar ou a própria classe.
    constructor(seletor:string) {
        const elemento = document.querySelector(seletor); //busca div negociacoes/mensagem view.
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        }else {
            throw Error(`Seletor ${seletor} não existe no DOM. Verifique pro desenvolvedor. `)
        }
    }

    public update(model:T):void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }

    protected abstract template(model:T):string; //usamos abstract para forçar todos que herdarem (classes filhas) dessa classe utilizem o metodo template.
    
}