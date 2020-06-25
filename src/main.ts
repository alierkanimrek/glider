import {GHTMLControl, GDataObject, GHTMLInputEvent, ValidityMessages} from "./glider/glider"

// Compile time static view
import view from "./main.ghtml"









/*    Control Object
**    New instance will create on every application run
**    Loot route definition at index.ts
*/
export class Main extends GHTMLControl {


    /* Identified into view with GID property
    ** A gid=vw_link_home ...
    ** And automatically assigned when creating DOM element
    ** 
    ** Warning:
    ** You should be careful for GID value, because overwrites the 
    ** existing property or method in control object
    **
    ** You can also access this element via this.e["vw_link_home"] property
    ** without any independent property definition
    */ 
    vw_link_home: HTMLElement
    //vw_link_settings: HTMLElement
    vw_main_container: HTMLElement
    vw_menu_button: HTMLElement
    vw_nav_menu: HTMLElement


    constructor() {
        // Create view
        super({view:view})
        
        // Link DOM events to methods
        this.linkEvents([
            [this.vw_link_home, "click", this.menuClicked],
            [this.e["vw_link_settings"], "click", this.menuClicked],
            [this.vw_menu_button, "click", this.activeMenu]])
    }




    menuClicked(e:Event){
        switch (e.target) {
            case this.vw_link_home:
                this.gDoc.navigate("")
                break;
            case this.e["vw_link_settings"]:
                this.gDoc.navigate("/settings")
                break;
        }
    }




    activeMenu(e:Event){
        this.vw_nav_menu.classList.toggle("is-active")
    }
}