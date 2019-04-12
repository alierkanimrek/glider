import {GDocument} from "./glider/glider"
import {Login, LoginData} from "./login"




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


let store = {
    login: new LoginData(),
    test: new LoginData()
}


GDocument.stores(store)
GDocument.route(route)



//history.replaceState({page: 1}, "title 1", "?page=1")
//window.location.hash = "/?page=1"
//console.log(window.location)
//console.log(document.)
