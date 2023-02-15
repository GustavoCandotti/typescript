//decorator nada mais é que uma função.
export function logarTempoDeExecucao(emSegundos:boolean = false) {
    return function(
        target: any, //se o meu decorator esta em um metodo estatico de uma classe, pode ser um funcao construtora ,e se nao for estatico, ele será meu prototype.
        propertyKey: string, //ele da o nome do metodo como string .
        descriptor: PropertyDescriptor //ele sabe tudo sobre o metodo que queremos modificar/executar.
    ) {
        const metodoOriginal = descriptor.value; //pega o metodo que usamos com decorator.
        descriptor.value = function(...args:Array<any>) { //se passarmos mais de um parametro, aut.vira um array.
            let divisor = 1;
            let unidade = 'milisegundos';
            if (emSegundos) { //true
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args); //permite passar um contexto e arrays.
            const t2 = performance.now();
            console.log(`${propertyKey}, tempo de execução: ${(t2-t1)/divisor} ${unidade}`)
            retorno
        }

        return descriptor; //para retornar o metodo como era antes.
    }
}
//quando pegamos um metodo de uma classe e jogamos em uma variavel, ele perde o this.