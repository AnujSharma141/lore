import { getDatabase, ref, onValue } from '@firebase/database'

const session = (active) =>{
    const database = getDatabase()
    let call = null
    onValue(ref(database,'/users/'+active.uid),data=>{ 
        call = data.val()
    })
    return call
}

export {session}