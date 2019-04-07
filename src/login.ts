import {GHTMLControl} from "./glider/glider"
import "./login.css"
import loginView from './login.ghtml'



export class Login extends GHTMLControl {
    
    constructor() {
        super(loginView)
        this.e["signup"].onclick = this.submit.bind(this)
    }

    submit(e:Event){
        window.location.hash = "/test"
    }

    run():void{

    }

}