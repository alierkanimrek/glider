import {GHTMLControl, GDocument, GDataObject,  Direction} from "./glider/glider"
import "./login.css"
import loginView from './login.ghtml'














export class Login extends GHTMLControl {
    
    constructor() {
        super(loginView)
        this.store(["login"], "login")


        //this.e["uname"].addEventListener("change", this.change.bind(this))
        //this.e["passw"].addEventListener("change", this.change.bind(this))

    }

    change(e:Event){
        console.log(e)
        //window.location.hash = "/test"
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
	
	
    uname : string = ""
    passw : string = ""


    constructor() {
		super()
	}

}
