import {GHTMLControl, GDocument, GDataObject, StoreObject, Direction} from "./glider/glider"
import "./login.css"
import loginView from './login.ghtml'














export class Login extends GHTMLControl {
    
    constructor() {
        super(loginView)
        this.e["signup"].onclick = this.submit.bind(this)
        this.store("login")
    }

    submit(e:Event){
        window.location.hash = "/test"
    }

    run():void{

    }

}



/*
let loginData = [
	{name:"uname", type:"string", target:"uname", flow: Direction.both} as StoreObject,
	{name:"password", type:"string", target:"uname", flow: Direction.both} as StoreObject,
]
*/



export class LoginData extends GDataObject {
	
	
    uname : string
    passw : string


    constructor() {
		super()
        this.uname = ""
        this.passw = ""
	}

}
