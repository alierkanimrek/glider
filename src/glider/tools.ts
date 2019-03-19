import * as ifs from "./ifs"








export function Dom(pt:string, p?: object):ifs.Dom{
    let r = <ifs.Dom>{t:pt}
    if (p) { r.p = p }
    return(r)
}



