import {gRoot, createGHTML} from "./glider/glider"
import {GHTMLElement} from "./glider/ifs"

//import * as base from "./base"


/*let r = g.root("approot")
let d = r.add("div")
let p = d.add("p", {innerText:"Hello", hidden: true, naber: "ali"})
p.hidden = false
console.log(p)
*/


let rr = `
approot

    DIV gid="d1"
        P innerText='Hello Ali' naber='hello'
        P innerText='Merhaba' naber= 'merhaba'
        DIV gid='d3'
            SPAN innerText='Halo'  naber= 'halo'
    DIV gid='d2' 
        P gid='p2' innerText='Ali'  naber= 'ali'
    NAV
`




createGHTML(rr)