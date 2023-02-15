//DECORATOR DE PROPRIEDADE.
export function domInjector(seletor:string) {
    return function(target: any, propertyKey:string) { //propertykey: o atributo no qual o meu decorator foi colocado.
        console.log(`Modificando prototype ${target.constructor.name} e adicionando
        getter para a propriedade ${propertyKey}`); //quando a classe é declarada.

        let elemento: HTMLElement; //escopo funcao.

        const getter = function() { //quando chamo o getter pela primeira vez o valor esta em branco.
            if (!elemento) {
                elemento = <HTMLElement>document.querySelector(seletor); //nunca será nulo.
                
                console.log(`buscando elemento do DOM com o seletor
                ${seletor} para injetar em ${propertyKey}`)
            }

            return elemento;  //busca elemento do DOM e retorna uma função.*/
        }

        Object.defineProperty( //prototype permite a criação de um objeto, sem acoplamento às suas classes especificas.
            target,
            propertyKey,
            {get : getter}
        )
    }
}
