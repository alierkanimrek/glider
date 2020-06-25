import {GHTMLControl, GDataObject, GHTMLInputEvent, ValidityMessages} from "./glider/glider"
import view from "./dashboard.ghtml"









/*    State name
**    Look import and store definition at index.ts
*/
export const name = "dashboard"





export class Dashboard extends GHTMLControl {


    // Overriden variable is linked to state
    bindingStore: DashboardData



    constructor(rootId:string) {
        // Create view as children under the given view id
        // Bind the this.bindingStore variable to state object 
        super({view:view, root:rootId, bindTo:name})
    }

}









/*    State object
**    Application variables and data connection methods
*/
export class DashboardData extends GDataObject {
	
	
    nname: string


}
