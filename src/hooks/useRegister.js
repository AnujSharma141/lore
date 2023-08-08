import { getDatabase, set, ref, } from '@firebase/database'
import { useContext } from 'react'
import { UserContext } from '../core/User'

export default function useRegister(){
    const database = getDatabase()
    const user = useContext(UserContext)
    const register = () =>
    set(ref(database,'users/' + user.data.uid),{
        name: user.data.displayName,
        email: user.data.email,
        img: user.data.photoURL,
        uid: user.data.uid,
        session: Date.now(),
        online: 'true'
    }) 
    return register
}