export interface Comparavel<T> {
    ehIgual(objeto:T):boolean;
}
//utilizamos uma interface para obrigar o desenvolvedor a implementar o metodo de comparação e ao mesmo tempo utlizamos <T> para dizer qual o tipo do objeto recebido como parametro na comparação.