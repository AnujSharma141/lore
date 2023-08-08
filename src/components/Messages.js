import React, { useState, useEffect } from 'react'
import { isLastMessageFrom, isMessageDelivered } from '../util/utils'

export default function Messages({display,active}) {
  const [checker, setChecker] = useState(false)
  const [delivered, setDelivered] = useState(false)

  useEffect(()=>{
    setChecker(isLastMessageFrom(active, display))
    setDelivered(isMessageDelivered(active, display))
  })

  return (
    <div>
      {display.map(item=>{
            return(
                <>
                <div className={item.from !== active.uid?'chat-message-to':'chat-message-from'}>
                <p className={item.from !== active.uid?'chat-to':'chat-from'}>{item.value}</p>
                </div>  
                </>
            )
        })}
        {checker ? 
        <p className='chat-notify'>
            {delivered ? 'delivered' :'sent'}
        </p>:null}  
    </div>
  )
}
