import {GHTMLControl, GDocument, GDataObject,  Direction} from "./glider/glider"
import "./login.css"
import loginView from './login.ghtml'














export class Login extends GHTMLControl {


    
    constructor() {
        super({view:loginView, bindTo:"login"})
        //this.store(["login"], "login")

        this.e["submit"].addEventListener("click", this.submit.bind(this))
        //this.e["passw"].addEventListener("change", this.change.bind(this))

    }

    submit(e:Event){
        console.log(this.bindingStore)
        //window.location.hash = "/test"
    }

    run():void{
        this.e["server"].addGs(`option innerText=test`)
        this.e["server"].addGs(`option innerText=main`)
        //console.log(this.e["server"])

        //Object.defineProperty(this.e["uname"], "value", {value:"ali"})
        let a = `
selectArea
  select id=server name=server
    option
    ^ Ali
    option
    ^ Veli
          `
        console.log(a)
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
    server : string = ""
    remember : boolean = true


    constructor() {
		super()
	}

}
