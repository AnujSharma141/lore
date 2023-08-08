import { session } from "../core/userInfo"

const sortMessagesByTime = (list) =>{
    let sorted = list.sort((a, b) => a.timestamp - b.timestamp)
    return sorted
}

const displayMessages = (messages) =>{
    const sent = messages.sent 
    const recieved = messages.recieved
    const combined  = sent.concat(recieved)
    const sorted = sortMessagesByTime(combined)
    return sorted 
}

const isLastMessageFrom = (active, list) =>{
    return list.length>0? list[list.length-1].from !== active.uid : ''
}

const isMessageDelivered = (active, list) =>{
    const user = session(active)
    let response = false
    if(list[list.length-1]!==undefined)
        if(user.session>list[list.length-1].timestamp) response = true 
    else response = (user.online === 'true')
    return response
}

export {displayMessages, isLastMessageFrom, isMessageDelivered}