import {gRoot, createGHTML, GHTMLControl} from "./glider/glider"
import {loginView} from "./login"


let msg="Hello world"


let serverList:string[] = ["Server1", "Server2", "Server3"]


//<body id="approot">
let gString1 = `
approot
    section class=hero is-primary
        div class=hero-body
            div class=container
              h1 class=title innerText=Glider
              h2 class=subtitle innerText=${msg}

    div class=box id=mybox
`


let gString2 = `
mybox
    div class=container
        div class=field
            p class=control has-icons-left has-icons-right
                input class=input type=email placeholder=Email
                span class=icon is-small is-left
                    i class=fas fa-envelope
                span class=icon is-small is-right
                    i class=fas fa-check
        
        div class=field
            p class=control has-icons-left
                input class=input type=password placeholder=Password
                span class=icon is-small is-left
                    i class=fas fa-lock


        div class=field
            p class=control has-icons-left
                span class=select
                    select id=ServerList
                span class=icon is-small is-left
                    i class=fas fa-globe

        div class=field
            p class=control
                button class=button is-success innerText=Login
`



//createGHTML(gString1)
//createGHTML(gString2)
//let n1 = new GHTMLControl(gString1)
console.log(loginView)
let login = new GHTMLControl(loginView)


/*
let servers = gRoot("ServerList")
for (var i = 0; i < serverList.length; i++) {
    servers.addGs(`option innerText=${serverList[i]}`)
}
*/