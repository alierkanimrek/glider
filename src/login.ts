import {GHTMLControl} from "./glider/glider"
import "./login.css"
import loginView from './login.ghtml'



export class Login extends GHTMLControl {
    
    constructor() {
        super(loginView)
    }
}