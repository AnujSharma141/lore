import React, {useState, useEffect} from 'react'
import { getDatabase, set, ref, update,onValue, push, child} from '@firebase/database'
import Messages from './Messages'
import { useMessages } from '../hooks/useMessages'
import { displayMessages } from '../util/utils'

export default function Chat({active}) {
    const [message, setMessage] = useState(null)

    const changeHandler = e =>{
        setMessage(e.target.value)
    }

    const messages = useMessages(active)
    const display = displayMessages(messages)
    
    //push message
    const send = e =>{
        e.preventDefault()
        messages.send(message)
        setMessage('')
    }

    return (
        <>
        <div className='chat-header'>
        <img className='chat-header-img' src={active.img} alt="" />    
        <div>
        <h2 className='chat-header-name'>{active.name}</h2>
        <p className='chat-header-mail'>{active.email}</p>
        </div>
        </div>
        
        <div className='chat'>
        <Messages display={display} active={active}/>
        
        <form onSubmit={send} className='chat-form'>
            <hr className='chat-hr' />
            <div className='chat-form-div'>
            <input placeholder='text message' value={message} onChange={changeHandler} required type="text" className='chat-inp' name="" id="" />                 
            <button className='chat-btn'>send</button>
            </div>
        </form>
        </div>
        </>
    )
}
