import React,{useState, useEffect} from 'react'
import { getAuth, signOut } from "firebase/auth"
import { getDatabase, set, ref, update,onValue } from '@firebase/database'

import Chat from './components/Chat'
import Users from './components/Users'
import './App.css'

export default function App(props) {
  const auth = getAuth()
  const database = getDatabase() 

  const user = {name: props.data.user.displayName,
    email: props.data.user.email,
    uid: props.data.user.uid,
    img: props.data.user.photoURL,
    online: 'true'}
  
  const [chat, setChat] = useState({list:[]})
  const [users, setUsers] = useState({list:[], active: null, status: false})

  //fetch users
  useEffect(() => {
    set(ref(database,'users/' + props.data.user.uid),{
    name: props.data.user.displayName,
    email: props.data.user.email,
    img: props.data.user.photoURL,
    uid: props.data.user.uid,
    online: 'true'
    })

    onValue(ref(database,'/users/'),data=>{ 
    setUsers({...users, list: data.val()== null? [] :data.val()})
    })
    
    onValue(ref(database,'/chat/'),data=>{ 
      setChat({list: data.val()})
      console.log(chat)
    })
      
  },[])

  //log out
  const signout = () =>{
    signOut(auth).then(() => {
    update(ref(database,'users/' + props.data.user.uid),{...user, online: 'false'})
    }).catch((error) => console.log(error))
    props.log(false)
  }
 
  return (
    <div className="app">
    <div className='app-nav'>
      <p className='app-title'>LORE</p>
      <p className='logout' onClick={signout}>Sign Out</p>
    </div>

    <div className='app-section'>
    <Users pick={setUsers} uid={props.data.user.uid} users={users} />
    <div className='app-chat'>
    {users.status?
      <Chat data={chat.list} status={users.status} active={users.active} user={user} uid={props.data.user.uid} />
    :<>
    <div className='chat-empty'>
            <h2 className='empty-title'>chat to users</h2>
            <p className='empty-sub'>select a user from the user list to chat</p>
        </div>
    </>}
    </div>
    </div>
    
    </div>
  );
}

