import {GHTMLElement, DomProperties} from "./ifs"
import * as tool from "./tools"











function add(tag:string, options?:DomProperties):GHTMLElement{
    /*
    Creates an HTML element with options 
    and enhance it as Glider element
    */
    let e = document.createElement(tag)

    if(options){
        //Get dom properties as Array
        let p = Object.getPrototypeOf(e)
        let ps = [...Object.keys(p), ...Object.keys(Object.getPrototypeOf(p))]
        
        for (const key of Object.keys(options)) {
            //Check every option is an attribute or property
            const val = options[key]
            const i = ps.indexOf(key)
            if ( i > -1) {
                //is a property
                eval("e."+key+" = val")
            } else {
                //is an attribute
                e.setAttribute(key, String(val))
            }
        }
    }
    this.appendChild(e)
    return(injectGHTMLElement(e))
}




function injectGHTMLElement(t:HTMLElement):GHTMLElement{
    /*
    Injects Glider functions and 
    properties to HTML element
    */
    let g = <GHTMLElement>Object.assign(t, {"add":add})
    return(g)
}




export function root(n : string):null|GHTMLElement {
    /*
    Find HTML element by Id and 
    enhance it as Glider element 
    */
    let root = document.getElementById(n)
    if (root == null) { 
        console.log("Root element not found")
        return
    } else {
        return(injectGHTMLElement(root))
    }
}




/*function buildGHTMLBlockFromGJSON(o:Object):GHTMLElement|void {
    /*
    Creates GHTML Elements from GJSON object recursively
    *//*
    let op = <{[key: string]: object}>o
    for (const e in op) {
        const child = <Object>op[e]
        const i = e.indexOf(" ")
        let t = ""
        let p = {}
        if (i == -1) { 
            t = e
        } else {
            t = e.slice(0,i)
            p = "{"+e.slice(i+1)+"}"
        }

        console.log(t)
        console.log(p)
        console.log("____")
        buildGHTMLBlockFromGJSON(child)
    }
}
*/


function buildGHTMLBlockFromArray(j:any, r:GHTMLElement):void {
    /*
    */
    console.log("______")
    console.log(r)
    for (const s in j){
        const e = j[s]
        if(typeof e === "object"){
            buildGHTMLBlockFromArray(e, r)
        } else {
            const i = e.indexOf(" ")
            let t = ""
            let p = {}
            if (i == -1) { 
                t = e
            } else {
                t = e.slice(0,i)
                p = "{"+e.slice(i+1)+"}"
            }

            console.log(t)
            console.log(p)
         }
    }

}





export function createGHTML(j:any, r?:string):null|GHTMLElement{
    /*
    Create GHTML Elements from j Array
    The first string of j must be root element id
    r option is override value of root element
    j = [<string>, [...]]

    let o:Object

    try {
        o = JSON.parse(j)
    }
    catch(err) {
        console.log(err)
        return
    }
    */
    let re
    if (r) { 
        re = root(r)
    } else {
        re = root(j[0])
    }
    
    if (re == null) { 
        return
    } else {
        buildGHTMLBlockFromArray(j[1], re)
    }

}


