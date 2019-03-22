import * as g from "./glider/glider"

//import * as base from "./base"


/*let r = g.root("approot")
let d = r.add("div")
let p = d.add("p", {innerText:"Hello", hidden: true, naber: "ali"})
p.hidden = false
console.log(p)
*/

let gj = ["approot",[
        ["div gid:'d1'",[
            "p innerText:'Hello', hidden: true, naber: 'hello'",
            "p innerText:'Merhaba', hidden: true, naber: 'merhaba'",
            ["div gid:'d3'",[
                "p innerText:'Halo', hidden: true, naber: 'halo'"]]]
        ],
        ["div gid:'d2'",
            ["p gid:'p2' innerText:'Ali', hidden: true, naber: 'ali'"]
        ]
    ]
]



let rr = `
    
    approot
        DIV gid:"d1"
            P innerText:'Hello', hidden: true, naber: 'hello'
            P innerText:'Merhaba', hidden: true, naber: 'merhaba'
            DIV gid:'d3'
                P innerText:'Halo', hidden: true, naber: 'halo'
        DIV gid:'d2' 
            P gid:'p2' innerText:'Ali', hidden: true, naber: 'ali'
`


let ra = rr.split(/\r?\n/)


function rootIndex(a:any):number {
    for (const l in a){
        if (a[l].trim().length > 0) {
            return(Number(l))
        }
    }
    return(-1)
}


function indent(a:string):string {
    const f = a.search(/[A-Z]/i)
    return(a.substring(0,f))
}




const ri = rootIndex(ra)    //Root line
const rt = ra[ri].trim()    //Trim root name
const ind = indent(ra[ri])    //Get indent string

let pt = [rt]

for (let i = ri + 1; i < ra.length - 1; i++) {
    const h = ra[i].split(ind)    //Makes an array starts with indents ["","","","DIV ..."]
    console.log(h)
    console.log(pt)
}


//console.log(rt)








//g.createGHTML(gj)




/*let base = g.dom({t:"div", p:r}) //object



class aa extends HTMLElement{

    goal:<HTMLElement>
}




function goal(){
    return(this)
}




let b = <aa>Object.assign(base, {"goal":goal})

console.log(b.goal())*/