import React,{useState, useEffect} from 'react'

import './App.css'

import Chat from './components/Chat'
import Users from './components/Users'
import Empty from './components/Empty'
import Nav from './components/Nav'
import useRegister from './hooks/useRegister'

export default function App({log}) {
  const [target, setTarget] = useState(false)
  const register = useRegister()
  
  useEffect(() => {
    register()
  },[])
  
  return (
    <div className="app">
    <Nav log={log} />  
    <div className='app-section'>
    <Users select={setTarget} />
    <div className='app-chat'>
    {target? <Chat active={target} />: <Empty/>}
    </div>
    </div>    
    </div>
  );
}

