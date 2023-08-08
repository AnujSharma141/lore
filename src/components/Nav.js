import React, { useContext } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { getDatabase, ref, update } from '@firebase/database'
import { UserContext } from '../core/User'

export default function Nav({log}) {
  const user = useContext(UserContext)
  const auth = getAuth()
  const database = getDatabase()
    const signout = () =>{
        signOut(auth).then(() => {
        update(ref(database, 'users/'+ user.data.uid+'/'),{"online":'false'})
        update(ref(database, 'users/'+ user.data.uid+'/'),{"session":Date.now()})
        }).catch((error) => console.log(error))
        log(false)
    }
    return (
    <div className="app-nav">
      <p className="app-title">LORE</p>
      <p className="logout" onClick={()=>signout()}>Sign Out</p>
    </div>
  )
}
