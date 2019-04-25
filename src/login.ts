import {GHTMLControl, GDataObject, GHTMLInputEvent} from "./glider/glider"
import "./login.css"
import loginView from './login.ghtml'














export class Login extends GHTMLControl {




	bindingStore:LoginData
    



    constructor() {
        super({view:loginView, bindTo:"login"})
        
        let select = [
            "selectArea",
            "  select id=server name=server"
        ]

        this.bindingStore.servers.forEach((s:string)=>{
            select.push("    option")
            select.push(`    ^ ${s}`)
        })

        this.createGHTML(select)
        this.up()

        //this.e["submit"].addEventListener("click", this.submit.bind(this))

    }

    /*
    submit(e:Event){
        console.log(this.bindingStore)
        //window.location.hash = "/test"
    }
    */

}




export class LoginData extends GDataObject {
	
	
    uname : string = "admin"
    passw : string = "123456"
    server : string = "Test2"
    remember : boolean = true
    servers : Array<string> = ["Test1", "Test2", "Test3"]



    uname_validation:object = {
		required: true,
		matches: {regex:"regex", equal:"abc"},
		standard: "email",
		length: {min:8, max:12},
		items: {min:1, max:3},
		range: {min:0, max:100}
    }



/*
    input(event:GHTMLInputEvent):void{
        console.log(event.name+" : "+String(event.value))
        console.log(this)
        console.log(event.element)
        console.log(event.control)
    }

    change(event:GHTMLInputEvent):void{
        console.log(event.name+" : "+String(event.value))
        console.log(this)
        console.log(event.element)
        console.log(event.control)
    }
*/
}
