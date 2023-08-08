import React from 'react'
import { useContacts } from '../hooks/useContacts'

export default function Users(props) {
    const contacts = useContacts()
    return (
        <div className='app-users'>
        <div className='app-users-online'>
          <p className='app-users-title'>online</p>
          {contacts.online.length!= 0?contacts.online.map(item=>{
            return <p className='app-user'>{item.name} <div className='green-dot'></div></p>
          }):<p className='app-user'>nobody</p>}
        </div>
        <div className='app-users-all'>
          <p className='app-users-title'>contacts</p>
          {contacts.list.map(item=>{
            return <p className='app-user' onClick={()=>props.select(item)}>{item.name}</p> 
          })} 
        </div>
      </div>
    )
}
