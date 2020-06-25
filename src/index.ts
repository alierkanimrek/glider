import {GDocument, Store} from "./glider/glider"

import {Main} from "./main"
import {Dashboard, DashboardData, name as DbStateName} from "./dashboard"








// Stateful store objects
// They will live until page close or reload
let store:Store = {}
store[DbStateName] = new DashboardData()




// Application ready checker
function appReady():boolean {
    // Check something is loaded
    return(true)
}




// Dashboard application main function
function dashboard(){

    // They will destroy when other application is run
    let main = new Main()
    let dashboard = new Dashboard(main.vw_main_container.id)
}




function settings(){
    let main = new Main()
}




// Route map for paths and apps
// path values can be Regex string
let route = [
    { path: "", app: dashboard},
    { path: "/settings", app: settings}
]




// Register definitions
GDocument.setReadyChecker(appReady)
GDocument.stores(store)




// Run
GDocument.route(route)