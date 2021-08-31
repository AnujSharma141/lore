import React, { useState } from 'react'

export default function Users(props) {
    const list = Object.values(props.users.list)
    const filter = list.filter(item => item.uid != props.uid)
    const online = filter.filter(item => item.online === 'true')

    return (
        <div className='app-users'>
        <div className='app-users-online'>
          <p className='app-users-title'>online</p>
          {online.length!= 0?online.map(item=>{
            return(
              <p className='app-user' onClick={()=>props.pick({...props.users, active:item, status:true})}>{item.name} <div className='green-dot'></div></p>
            )
          }):<p>nobody</p> }
        </div>
        <div className='app-users-all'>
          <p className='app-users-title'>all</p>
          {filter.map(item=>{
            return(
              <p className='app-user' onClick={()=>props.pick({...props.users, active:item, status:true})}>{item.name}</p>
            )
          })}
        </div>
      </div>
    )
}
