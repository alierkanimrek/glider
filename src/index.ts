import {gRoot, createGHTML} from "./glider/glider"

//import * as base from ./base


/*let r = g.root(approot)
let d = r.add(div)
let p = d.add(p, {innerText:Hello, hidden: true, naber: ali})
p.hidden = false
console.log(p)
*/



let msg="Hello world"


let serverList:string[] = ["Server1", "Server2", "Server3"]


let gString = `
approot


    section class=hero is-primary
        div class=hero-body
            div class=container
              h1 class=title innerText=Glider
              h2 class=subtitle innerText=${msg}

    div class=tile is-ancestor
        div class=tile is-parent
            div class=tile is-child box
                p
        div class=tile is-parent
            div class=tile is-child box

                div class=box 
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



createGHTML(gString)


let servers = gRoot("ServerList")
//let ul = block.add(ul)
for (var i = 0; i < serverList.length; i++) {
    servers.addGs(`option innerText=${serverList[i]}`)
}
