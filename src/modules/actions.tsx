
import { Action } from "./types"

export const chnageMessage=(message:string)=>{
    console.log ('inside : chnageMessage')
    return {
        type:"UPDATE_MESSAGE",
        message:message
    }   as Action
}

export const updateTotalDonation=(amount:number)=>{
    console.log ('inside : updateTotalDonation')
    return {
        type:"UPDATE_TOTAL_DONATE",
        amount:amount
    }   as Action
}
