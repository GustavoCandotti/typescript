export function escapar(
    target: any,//se o meu decorator esta em um metodo estatico de uma classe, pode ser um funcao construtora ,e se nao for estatico, ele será meu prototype.
    propertyKey: string,//ele da o nome do metodo como string. 
    descriptor: PropertyDescriptor//ele sabe tudo sobre o metodo que queremos modificar/executar.
) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function(...args:Array<any>) {//se passarmos mais de um parametro, aut.vira um array.
        let retorno = metodoOriginal.apply(this, args); //permite passar um contexto e arrays.
        if (typeof retorno === 'string') {
            /*
            console.log(`@escape em ação na classe ${this.constructor.name} para o método ${propertyKey}`)
            //${this.constructor.name} consegue acessar o nome da nossa CLASSE.
            //${propertyKey} metodo dentro da classe negociacoes view. == template.
            */
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return retorno;
    }

    return descriptor;
}