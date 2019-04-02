/*
The MIT License (MIT)

Copyright © 2019 Ali E.İMREK <alierkanimrek@gmail.com>

Permission is hereby granted, free of charge, 
to any person obtaining a copy of this software and 
associated documentation files (the “Software”), 
to deal in the Software without restriction, 
including without limitation the rights to use, copy, 
modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to 
whom the Software is furnished to do so, subject 
to the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR 
ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/








export interface DomProperties {
    [name: string]: string | boolean
}




export class GHTMLElement extends HTMLElement{

    add(tag:string, options?:DomProperties | null):GHTMLElement{ return(this) }
    addGs(gs:string):GHTMLElement{ return(this) }
}








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




function addGs(a:string):GHTMLElement {
    /*
    Create element from gString
    */
    return(createGHTMLElement(a, this))
}




function injectGHTMLElement(t:HTMLElement):GHTMLElement{
    /*
    Injects Glider functions and 
    properties to HTML element
    */
    let g = <GHTMLElement>Object.assign(t, {"add":add, "addGs":addGs})
    return(g)
}




export function gRoot(n : string):null|GHTMLElement {
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




function gHTMLStrRootIndex(a:any):number {
    /*
    Finds first line 
    */
    for (const l in a){
        if (a[l].trim().length > 0) {
            return(Number(l))
        }
    }
    return(-1)
}




function gHTMLStrIndent(a:string):string {
    /*
    Finds space 
    */
    const f = a.search(/[A-Z]/i)
    return(a.substring(0,f))
}




function createGHTMLElement(a:string, r:GHTMLElement): GHTMLElement{
    /*
    Parse Tag and Properties from string
    and adds it to the r element 
    */
    a = a.trim()
    const i = a.indexOf(" ")
    let t = ""    //Tag name
    let p = {}    //Properties
    if (i == -1) {    //No properties
        t = a
    } else {
        t = a.slice(0,i)
        p = prop2Obj(a.slice(i+1))
        //***********FIX Error check***************
    }
    return(r.add(t,p))
}




function prop2Obj(a:string):object{
    /*
    Creates an object from properties string
    */

    let s = a.split("=")
    let l = []    //Will contain keys and values
    let res:{[key:string]:string} = {}    //Result object
    
    //Push every keys and values into array
    for (let i in s) {

        //Find space for start position of key
        let n = s[i].trim().lastIndexOf(" ")

        //Last item is always an value, don't split it
        if(Number(i) == s.length-1){
            n=-1
        }

        //Check key=value or only key
        if(n>-1){

            //Get value of previous key
            l.push(s[i].slice(0,n).trim())
            //Get key
            l.push(s[i].slice(n).trim())
        }
        else{

            //Get key
            l.push(s[i].trim())    
        }
        
    }


    //Make an indexed object as key:value...
    for (var i = 0; i < l.length; i+=2) {
        res[l[i]] = l[i+1]
    }

    return(res)
    
}




export function createGHTML(ghtmlstr:string, root?:string):null|GHTMLElement{
    /*
    Create GHTML Elements from GHTML String
    The first string of ghtml must be root element id
    root option is override value of root element
    */
    //Split lines
    let lines = ghtmlstr.split(/\r?\n/)

    //Find root line number
    const rootLine = gHTMLStrRootIndex(lines)

    //Get root Element Id
    let rootId = lines[rootLine].trim()
    if (root) {
        rootId = root
    }

    //Prepare root element for add
    let parents = [gRoot(rootId)]
    //***********FIX check root***************

    //Indent
    let ind = null

    //Every lines of GHTMLStr after rootLine
    for (let i = rootLine + 1; i < lines.length - 1; i++) {

        //Empty line
        if (!lines[i].trim()) {         continue        }

        //Get indent from first element line
        if (!ind){    ind = gHTMLStrIndent(lines[i])    }
        //**********FIX Indent check procedure****************

        //Makes an array starts with indents ["","","","DIV ..."] and get level
        const h = lines[i].split(ind)
        const l = h.length - 1
        
        //Create Element and add parents level for next element
        parents[l] = createGHTMLElement(lines[i], parents[l-1])
    }

    return(parents[0])
}





export class GHTMLControl {

    rootElement:GHTMLElement
    
    constructor(view:string, root?:string) {
        this.rootElement = createGHTML(view, root)
    }
}