import {GHTMLControl, createGHTML, GDocument, GDataObject,  Direction} from "./glider/glider"
import "./login.css"
import loginView from './login.ghtml'














export class Login extends GHTMLControl {


	bindingStore:LoginData = <LoginData> this.bindingStore
    
    constructor() {
        super({view:loginView, bindTo:"login"})
        
        this.e["submit"].addEventListener("click", this.submit.bind(this))

    }

    submit(e:Event){
        console.log(this.bindingStore)
        //window.location.hash = "/test"
    }

    run():void{
        
        let select = "selectArea\n"
        select += "  select id=server name=server\n"

        this.bindingStore.servers.forEach((s:string)=>{
        	select += "    option\n"
        	select += `    ^ ${s}\n`
        })

        createGHTML(select,this)
    }

}




export class LoginData extends GDataObject {
	
	
    uname : string = ""
    passw : string = ""
    server : string = ""
    remember : boolean = true
    servers : Array<string> = ["Test1", "Test2", "Test3"]


    constructor() {
		super()
	}

}
