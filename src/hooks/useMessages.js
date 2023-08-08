import { useContext, useEffect, useState } from 'react'
import { getDatabase, ref, onValue, push,update } from '@firebase/database'
import { UserContext } from '../core/User'

export function useMessages(target) {
    const user = useContext(UserContext)
    const database = getDatabase()
    const [from, setFrom] = useState([])
    const [to, setTo] = useState([])
    
    useEffect(()=>{
        onValue(ref(database,`/chat/${user.data.uid}/${target.uid}/messages/`),data=>{ 
            setFrom(data.val() !==  null?Object.values(data.val()):[])
        })
        onValue(ref(database,`/chat/${target.uid}/${user.data.uid}/messages/`),data=>{ 
            setTo(data.val() !== null ?Object.values(data.val()):[])
        })  
        update(ref(database, `/chat/${user.data.uid}/${target.uid}`),{"read":'true'})
    },[target])

    const send = (value) =>{
        push(ref(database,`chat/${user.data.uid}/${target.uid}/messages/`),
        {value: value, 
        timestamp:Date.now(),
        from: user.data.uid})
    }

    return {sent: to, recieved: from, send: send}
}
