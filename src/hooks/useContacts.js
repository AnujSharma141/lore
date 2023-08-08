import { useContext, useEffect, useState } from 'react'
import { getDatabase, ref,onValue } from '@firebase/database'
import { UserContext } from '../core/User'

export function useContacts() {
    const user = useContext(UserContext)
    const database = getDatabase()
    const [users, setUsers] = useState({data: null, status: false})
    useEffect(()=>{
      onValue(ref(database,'/users/'),data=>{ 
        setUsers({data:data.val(), status: true})
      })      
    },[])

    const displayUsers = users.status? Object.values(users.data).filter(item => item.uid !== user.data.uid):[{name: '...'}]
    const onlineUsers = users.status? displayUsers.filter(item => item.online === "true"):[]
    return {online: onlineUsers, list: displayUsers}
}
