import { View } from "./view.js";

export class MensagemView extends View<string> {

    protected template(model:string):string { //usamos protected para que o desenvolvedor tenha acesso apenas ao template.
        return `
            <p class="alert alert-info">${model}</p>
        `
    }

}