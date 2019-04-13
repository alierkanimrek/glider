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



export interface HTMLElementCollection {
    [e:string]: GHTMLElement
}


interface RouteObj {
    [path:string]:Function
}

export interface Route extends Array<RouteObj> { }



export enum Direction {
    toStore,
    toUi,
    both
}


export interface BindingObject {
    id:string,
    data:string,
    dataProp?: string,
    type?:any,
    flow?: Direction
}


interface Store {
    [name:string]:GDataObject
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
                //Object.defineProperty(e,key,val)
                //e.setAttribute(key, <string>val)
                
        
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
    return(createGHTMLElement(a, this.control, this))
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
    const f = a.search(/[\S]/i)
    return(a.substring(0,f))
}




function createGHTMLElement(a:string, r:GHTMLElement, c:GHTMLControl): GHTMLElement{
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

    //Create element
    let e = r.add(t,p)
    //Add control link to Dom
    Object.defineProperty(e,"control", {value:c})
    if(e.id !== ""){
        c.e[e.id] = e
    }

    return(e)
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




export function createGHTML(ghtmlstr:string, control:GHTMLControl, root?:string):null|GHTMLElement{
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
    for (let i = rootLine + 1; i < lines.length; i++) {

        //Empty line
        if (!lines[i].trim()) {         continue        }

        //Get indent from first element line
        if (!ind){    ind = gHTMLStrIndent(lines[i])    }
        //**********FIX Indent check procedure****************

        //Makes an array starts with indents ["","","","DIV ..."] and get level
        const h = gHTMLStrIndent(lines[i]).split(ind)
        const l = h.length-1

        //Check ^ command for add innerHTML
        if (lines[i].trim()[0] == "^") {
            let itxt = lines[i].slice(gHTMLStrIndent(lines[i]).length)
            parents[l].innerHTML = itxt.slice(1)
            continue
        }
        
        //Create Element and add parents level for next element
        parents[l] = createGHTMLElement(lines[i], parents[l-1], control)
    }

    return(parents[0])
}



function uuid():string {
    const a = window.crypto.getRandomValues(new Uint32Array(10))
    return(Array.from(a, (dec)=>{return('0' + dec.toString(16)).substr(-2)}).join(''))
}










export class GHTMLControl {
    /*
    View Control object
    */

    protected rootElement:GHTMLElement
    private gDoc:GDoc
    public  id:string
    public  e:HTMLElementCollection
    private storeNames : string[]
    



    constructor(view:string, root?:string) {
        
        this.e = {}

        //Generate UUID 
        this.id = uuid()


        //Link for global Glider object
        this.gDoc = GDocument

        //Register itself to global object for custom events
        this.gDoc.register(this)

        //Create static view
        this.rootElement = createGHTML(view, this, root)

    }




    public navigate():void{
        /*
        This only triggers from GDocument navigation event
        Clears for all childs and unregister from GDocument
        */
        while(this.rootElement.children[0]){
            this.rootElement.children[0].remove()
        }
    }



    protected store(storeNames:string[], bindto?:string):void{
        /*
        Connect control and data store
        */
        this.storeNames = storeNames
        this.gDoc.bindStore(this, this.storeNames)

        //Auto bind one-way flow 
        if(bindto){
            let targetDataObj = this.gDoc.gData(bindto)
            let targetProps = Object.keys(targetDataObj)
            let sourceList = Object.keys(this.e)
            sourceList.forEach((id:string) => {
                let name = this.splitBindName(id)
                if(name[1]){
                    let b:BindingObject = { 
                        id : id,
                        data : bindto,
                        dataProp: name[0],
                        flow: Number(name[1])
                    }
                    this.bind(b)
                }
            })
        }
    }


    private splitBindName(id:string):string[]{
        let result = [id.substring(0,id.lastIndexOf("-")),
            id.substr(id.lastIndexOf("-")+1)]
        //Seperator or bind property not found
        if(
            id.lastIndexOf("-") < 0 || 
            result[1].indexOf("bind") !== 0 || 
            result[1].length !== 5){
            
            result = [id, ""]
        }
        else{
            result[1] = result[1][4]
            // Enum Direction check
            if(Number(result[1])>2){
                 result = [id, ""]       
            }
        }
        return(result)
    }



    protected bind(binding:BindingObject):void{
        /*
        */
        //Default values
        let { id="", data="", dataProp="", type="", flow=Direction.toStore } = binding

        let element = this.e[id]
        let dataObj = this.gDoc.gData(data)
                    
    }


    

}








class GDoc{
    /*
    This class contains gLobal variables, events and processes
    Every GHTML object links and get events etc.
    */    
    
    //Linked GHTMLControl objects for event dispatching
    private controls:any

    //Data Store Meneger
    private  store: Store

    //Routing Manager
    private routes:Route

    private basePath: string
    private fileProtocol:boolean



    constructor() {
        console.log("Glider initializing...")

        //Watch navigation 
        window.addEventListener("popstate", this.navigate.bind(this))

        this.controls = []
        this.basePath = ""
        
        this.fileProtocol = false
        if(location.protocol=="file:"){
            this.fileProtocol = true
        }
    }


    public stores(store:Store):void{
        this.store = store
    }


    public gData(name:string) : GDataObject|null {
        if(Object.keys(this.store).toString().search(name) > -1){
            return(this.store[name])
        }
    }


    public bindStore(control:GHTMLControl, storeNames:string[]):void{
        /*
        */
        storeNames.forEach( 
            ( sname : string ) =>{
                if(Object.keys(this.store).toString().search(sname) > -1){
                    this.store[sname].bind(control)
                    //control.bind(this.store[sname])
                }
                else{    console.log("Store name '"+sname+"'' not found")    }
            })
    }



    private navigate(e:Event){
        /*
        Navigation event handler
        */
        this.controls.forEach((c: GHTMLControl) => {
            try{    c.navigate()    }
            catch{}
        })
        this.controls = []
        this.run()
    }




    public register(c:GHTMLControl):void{
        /**/
        this.controls.push(c)
    }




    public unregister(c:GHTMLControl):void{
        /**/
        this.controls = this.controls.filter( (cr:GHTMLControl) => {
            return(cr.id !== c.id)
        })
    }




    public route(r:Route, bp?:string):void{
        /**/
        this.routes = r
        if(bp){    this.basePath = bp    }
        this.run()
    }



    private getRoute():Function|null {
        /*
        Search route function
        */

        let entry = null
        let path = ""
        
        // App is an local file
        if (this.fileProtocol) {

            // Browsers adds # character for local jumping
            // We should remove file path and # character from uri
            this.basePath = location.href.split("#")[0]
            path = location.href.replace("#", "")
            path = path.replace(this.basePath, "")
        }

        // App is loaded from a server
        else{
            path = location.pathname.replace(this.basePath, "")
        }


        //Find entry function according to routes
        for (let i = 0; i < this.routes.length; i++) {
            let p = Object.keys(this.routes[i])[0]
            let f = this.routes[i][p]

            //Check full matching
            if(p == path){
                entry = f
                break
            }

            //Check RegExp matching if it is not empty 
            if(RegExp(p).test(path) && p !== ""){
                entry = f
                break
            }
        }
        return(entry)
    }




    private run():void{
        /**/

        let entry = this.getRoute()

        // May be not fonud
        if(!entry){
            console.log("Url not macth any route")
            return
        }

        // Check DOM is ready
        if(document.readyState == "complete"){
            console.log("Runnig the application...")
            entry()
        }

        // Not ready
        else{
            setTimeout(this.run.bind(this), 1)
        }
    }
}





class GDataControl{
    
}



export class GDataObject extends GDataControl {
    

    private controls:GHTMLControl[]=[]

    constructor() {
        super()

    }


    public bind(control:GHTMLControl):void{
        this.controls.push(control)
        //console.log(this.controls)
    }




}





//Global object for management glider application
export let GDocument = new GDoc()