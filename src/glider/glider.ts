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
    control:GHTMLControl
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
                let a = Object(e)
                a[key] = val
        
            } else {
                //is an attribute
                e.setAttribute(key, String(val))
            }
        }
    }

    this.appendChild(e)
    return(injectGHTMLElement(e))
}




function addGs(gString:string):GHTMLElement {
    /*
    Create element from gString
    */
    return(createGHTMLElement({
        gStringLine: gString,
        root: this,
        control : this.control}))
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


export interface createGHTMLElementProps {
    gStringLine:string
    root:GHTMLElement
    control:GHTMLControl
}



function createGHTMLElement(prop:createGHTMLElementProps): GHTMLElement{
    /*
    Parse Tag and Properties from string
    and adds it to the r element 
    */

    prop.gStringLine = prop.gStringLine.trim()
    const i = prop.gStringLine.indexOf(" ")
    let t = ""    //Tag name
    let p = {}    //Properties
    if (i == -1) {    //No properties
        t = prop.gStringLine
    } else {
        t = prop.gStringLine.slice(0,i)
        p = prop2Obj(prop.gStringLine.slice(i+1))
        //***********FIX Error check***************
    }

    //Create element
    let e = prop.root.add(t,p)
    //Add control link to Dom
    Object.defineProperty(e,"control", {value:prop.control})
    if(e.attributes.getNamedItem("id")){
        prop.control.e[e.id] = e
        Object.defineProperty(prop.control, e.id, {value:e})
    }
    //Bind control to data source
    if(e.attributes.getNamedItem("name")){
        e.control.bind0(e)
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




export function createGHTML(ghtmlstr:string|Array<string>, control:GHTMLControl, root?:string):null|GHTMLElement{
    /*
    Create GHTML Elements from GHTML String
    The first string of ghtml must be root element id
    root option is override value of root element
    */

    let lines:Array<string>

    //Check string or array
    if(typeof ghtmlstr == "string"){
        
        //Split lines
        lines = ghtmlstr.split(/\r?\n/)
    }
    else{

        lines = ghtmlstr
    }

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
        parents[l] = createGHTMLElement({
            gStringLine : lines[i], 
            root : parents[l-1], 
            control : control})
    }

    return(parents[0])
}



function uuid():string {
    const a = window.crypto.getRandomValues(new Uint32Array(10))
    return(Array.from(a, (dec)=>{return('0' + dec.toString(16)).substr(-2)}).join(''))
}





export interface GHTMLControlProps {
    view:string 
    root?:string
    bindTo?:string
}




export class GHTMLControl {
    /*
    View Control object
    */

    private gDoc:GDoc
    private storeNames : string[]
    private t = (e:any):HTMLInputElement => {return(e)}

    protected rootElement:GHTMLElement

    public  id:string
    public  e:HTMLElementCollection
    public bindingStore: GDataObject
    




    constructor(prop:GHTMLControlProps) {

        //Default values
        let { view="", root="", bindTo="" } = prop

        //Generate UUID 
        this.id = uuid()

        //Link for global Glider object
        this.gDoc = GDocument
        
        this.e = {}
        this.bindingStore = this.gDoc.gData(prop.bindTo)


        //Register itself to global object for custom events
        this.gDoc.register(this)

        //Create static view
        this.rootElement = createGHTML(prop.view, this, prop.root)

        this.up()

    }



    protected createGHTML(ghtml:string|Array<string>):void{
        createGHTML(ghtml,this)
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



    public bind0(e:GHTMLElement):void{
        /*
        Connect control and data store
        */

        let type = this.t(e).type
        let nodeName = e.nodeName
        let on = "input"

        if(nodeName === "SELECT"){
            on = "change"
        }
        e.addEventListener(on, this.bindingStore.updateData.bind(this.bindingStore))

    }



    protected up():void{

        let bindingNames = Object.getOwnPropertyNames(this.bindingStore)

        // Every element
        Object.getOwnPropertyNames(this.e).forEach((e:string)=>{

            let target = this.t(this.e[e])
            let type = target.type
            let value:any
            
            //Element's name is in binding store
            if(bindingNames.indexOf(e) > -1){

                value = Object(this.bindingStore)[e]

                if(type == "checkbox" || type == "radio"){
                    target = Object.assign(target, {checked:value})
                }
                else{
                    target = Object.assign(target, {value:value})   
                }

            }
        })
    }


    /*
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
    */


}









export interface GHTMLInputEvent{
    element:GHTMLElement,
    control:GHTMLControl, 
    name:string, 
    value:any,
    type:string
}


/*
interface RequireValidationRule{
    required: boolean,
    message?: string
}


interface MatchesValidationRule{
    regex?: string,
    equal?: string,
    message?: string
}

interface StandardValidationRule{
    standard: string,
    message?: string
}

interface LengthValidationRule{
    min?: number,
    max?: number,
    message?: string
}


interface ItemsValidationRule{
    min?: number,
    max?: number,
    message?: string
}

interface RangeValidationRule{
    min: number,
    max: number,
    message?: string
}

interface SpecialValidation{
    (source: object, value: any): boolean
}


export interface ValidationRules {
        required?: RequireValidationRule,
        matches?: MatchesValidationRule,
        standard?: StandardValidationRule,
        length?: LengthValidationRule,
        items?: ItemsValidationRule,
        range?: RangeValidationRule,
        special?:SpecialValidation
}
*/



export interface ValFalMessages{
    /*
    It has same properties as HTMLInputElement.validity
    But <any> property can use instead of others
    */
    badInput?: string,
    ​customError?: string,
    ​patternMismatch?: string,
    ​rangeOverflow?: string,
    ​rangeUnderflow?: string,
    ​stepMismatch?: string,
    ​tooLong?: string,
    ​tooShort?: string,
    ​typeMismatch?: string,
    ​valueMissing?: string,
    any?: string
}



class GDataControl{
    /*
    Server connection services
    */
}



export class GDataObject extends GDataControl {
    


    constructor() {
        super()
    }



    public updateData(e:Event):void{
        /*
        Update local variables form DOM
        */

        // Get variables
        let target = <HTMLInputElement> e.target
        let targetGHTMLE = <GHTMLElement> e.target
        let name:string = target.name
        let value:any
        let type:string = target.type

        //Check type of input
        if(type == "checkbox" || type == "radio"){
            value = target.checked
        }
        else{
            value = target.value
        }

        // Set values
        Object.defineProperty(this, name, {value:value})

        //Check validation status
        if(target.willValidate && !target.validity.valid){
            //Invalidate, get special message if exist
            this.useSpecialValFalMessages(target)
        }

        //Call tracking method for user control
        this.input({
            element:targetGHTMLE,
            control: targetGHTMLE.control, 
            name:name, 
            value:value,
            type:type
        })
    }


    private useSpecialValFalMessages(target:HTMLInputElement):void{
        /*
        Check variable as <var_name>__valFalMessages

        */
        if(Object.getOwnPropertyNames(this).indexOf(target.name+"_valFalMessages") > -1){
            let valFalMessages:ValFalMessages = Object(this)[target.name+"_valFalMessages"]
            Object.getOwnPropertyNames(valFalMessages).forEach((v:string)=>{
                //Check validation status of special message as same name 
                if(Object(target.validity)[v]){
                    //then set the message
                    target.setCustomValidity(Object(valFalMessages)[v])
                    return
                }
            })
            //Not match
            if(valFalMessages.any){
                target.setCustomValidity(valFalMessages.any)
            }
        }
    }

    /*
    private validate(name:string):boolean{

        let result:boolean = false

        if(Object.getOwnPropertyNames(this).indexOf(name+"_validation") > -1){
            let validation:ValidationRules = Object(this)[name+"_validation"]
            let rules:Array<string> = Object.getOwnPropertyNames(validation)
            let value:any = Object(this)[name]

            rules.forEach((rule:string)=>{
                
                let message:string
                
                switch (rule) {
                    case "required":
                        let ruleObj = <RequireValidationRule>Object(validation)[rule]
                        if(ruleObj.required && value !== ""){ result = true }
                        if(!result && ruleObj.message){ message = ruleObj.message }
                        break;
                    case "matches":
                        // code...
                        break;
                    case "standard":
                        // code...
                        break;
                    case "length":
                        // code...
                        break;
                    case "items":
                        // code...
                        break;
                    case "range":
                        // code...
                        break;
                    default:
                        console.log("Unknown validation rule, "+rule )
                        break;
                }
                if(!result && message){
                    console.log(message)
                }
            })
        }
        return(result)
    }*/


    //Override this method
    protected input(e:GHTMLInputEvent):void{}


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

    //App Ready control function
    private readyChecker:Function

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

        this.readyChecker = () =>{return(true)}
    }


    public stores(store:Store):void{
        this.store = store
    }


    public gData(name:string) : GDataObject|null {
        if(Object.keys(this.store).toString().search(name) > -1){
            return(this.store[name])
        }
        else{
            console.log(`Data binding not fond. "${name}"`)
        }
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


    public setReadyChecker(f:Function):void{
        this.readyChecker = f
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
        if(document.readyState == "complete" && this.readyChecker()){
            console.log("Runnig the application...")
            entry()
        }

        // Not ready
        else{
            setTimeout(this.run.bind(this), 1)
        }
    }
}




//Global object for management glider application
export let GDocument = new GDoc()