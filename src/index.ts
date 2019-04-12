import {GDocument} from "./glider/glider"
import {Login} from "./login"




function login():void{
    
    let login = new Login()
    login.run()
}


function test():void{
    
    console.log("test")
}

let route = [
    {'' : login},
    {'/test' : test},
]




GDocument.route(route)
//GDocument.run(login)


/*
class MyApp extends GDocument {
    
    constructor() {
        super()
    }

    load():void{
        
    }
}
*/







//history.replaceState({page: 1}, "title 1", "?page=1")
//window.location.hash = "/?page=1"
//console.log(window.location)
//console.log(document.)
