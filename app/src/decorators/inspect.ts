export function inspect(
    target: any,//se o meu decorator esta em um metodo estatico de uma classe, pode ser um funcao construtora ,e se nao for estatico, ele será meu prototype.
    propertyKey: string,//ele da o nome do metodo como string 
    descriptor: PropertyDescriptor//ele sabe tudo sobre o metodo que queremos modificar/executar.
){
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args:any[]) {
        console.log(`--- Método ${propertyKey}`);
        console.log(`------ parâmetros: ${JSON.stringify(args)}`)
        const retorno = metodoOriginal.apply(this, args);
        console.log(`------ retorno: ${JSON.stringify(retorno)}`)
        return retorno
    }

    return descriptor;
}
