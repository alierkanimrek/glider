import {GHTMLControl, GDataObject, GHTMLInputEvent, ValFalMessages} from "./glider/glider"
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


    uname_valFalMessages:ValFalMessages = {
        valueMissing:"Bu olmadı"
    }



    /*
    uname_validation:ValidationRules = {
		required: {required:true, message:"Required"},
		matches: {regex:"regex", equal:"abc", message:"not valid"},
		standard: {standard: "email", message:"not standard"},
		length: {min:8, max:12, message:"min:8 max: 12 char"},
		items: {min:1, max:3, message:"min:1, max:3 items"},
		range: {min:0, max:100, message:"Allowed range is 0-100 "}
    }*/




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

}
