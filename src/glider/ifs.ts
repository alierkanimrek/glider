

export interface Tag {
    name: string,
    id: string
}




export interface Dom {
    t : string,
    p?: {}
}


export interface DomProperties {
    [name: string]: string | boolean
}



export class GHTMLElement extends HTMLElement{

    add(tag:string, options?:DomProperties | null):GHTMLElement{ return(this) }
}
