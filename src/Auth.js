import React,{useState} from 'react'
import App from './App'

import './config'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"

export default function Auth(){
const [pass, setPass] = useState(false)
const [data, setData] = useState({user:null, token: null, credential: null})
const [err, setErr] = useState({status:false, message: null})

const auth = getAuth()

const popup = () => {
//used code from firebase docs
const provider = new GoogleAuthProvider()  
     
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
    setData({user: user, credential: credential, token: token})
    setPass(user.emailVerified)    
  }).catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.email
    const credential = GoogleAuthProvider.credentialFromError(error)
    setErr({status: true, message: error.message})
})
console.log(data.user)
}
return(
    pass? <App data={data} log={setPass} /> : 
    <div className='sign'>
        <div className='sign-form'>
            <h3 className='sign-form-title' >Lore</h3>
            <p className='sign-subtitle'>a web based chat application.</p>
            <button className='sign-button' onClick={popup}>Sign In</button>
        </div>
    </div>
)
}

