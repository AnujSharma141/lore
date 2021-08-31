import React, {useState, useEffect} from 'react'
import { getDatabase, set, ref, update,onValue, push, child} from '@firebase/database'

export default function Chat(props) {
    const database = getDatabase() 
    const [message,setMessage] = useState({text:null, value:null})
    const changeHandler = e =>{
        setMessage({text:e.target.value})
    }

    //push message
    const send = e =>{
        e.preventDefault()

        push(ref(database,'chat/'),
        {from:props.uid,
        to:props.active.uid,
        message:message.text, 
        timestamp:Date.now(),
        read: false})
        setMessage({text: ''})
    }

    let filter = []
    let doubleFilter = []
    let checker 

    if(props.data != null){
    filter = Object.values(props.data).filter(item=>
        item.to == props.uid || item.to == props.active.uid
    )
    doubleFilter = filter.filter(item=>
        item.from == props.uid || item.from == props.active.uid
    )
    checker = doubleFilter[doubleFilter.length-1]
    //last message of user[sender]
    if(checker.from == props.uid){
        //dk
    }else{
        //set read true
        const index = Object.values(props.data).indexOf(checker)
        const hash = Object.keys(props.data)[index] 
        update(ref(database,'chat/' + hash),{...checker, read: 'true'})
    }
    console.log(checker==props.uid)
    const updated = filter.map(item=> {return(
        {...item,read: true}
    )})
    
    }
    

    return (
        <>
        <div className='chat-header'>
        <img className='chat-header-img' src={props.active.img} alt="" />    
        <div>
        <h2 className='chat-header-name'>{props.active.name}</h2>
        <p className='chat-header-mail'>{props.active.email}</p>
        </div>
        </div>
        
        <div className='chat'>
        {doubleFilter.map(item=>{
            return(
                <>
                <div className={item.from == props.uid?'chat-message-to':'chat-message-from'}>
                <p className={item.from == props.uid?'chat-to':'chat-from'}>{item.message}</p>
                </div>  
                </>
            )
        })}
        {checker.from==props.uid?
        <p className='chat-notify'>{checker.read ==='true'?'seen':props.active.online==='true'?'delivered':'sent'}</p>:null}
        
        <form onSubmit={send} className='chat-form'>
            <hr className='chat-hr' />
            <div className='chat-form-div'>
            <input placeholder='type here ..' onChange={changeHandler} value={message.text} required type="text" className='chat-inp' name="" id="" />
            <button className='chat-btn'>send</button>
            </div>
        </form>
        </div>
        </>
    )
}
