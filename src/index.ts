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



g.createGHTML(gj)




/*let base = g.dom({t:"div", p:r}) //object



class aa extends HTMLElement{

    goal:<HTMLElement>
}




function goal(){
    return(this)
}




let b = <aa>Object.assign(base, {"goal":goal})

console.log(b.goal())*/