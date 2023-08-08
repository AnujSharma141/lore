import React,{ useState } from 'react'
import App from './App'

import './config'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { VerifiedContext } from './core/Verified.js'
import { UserContext } from './core/User'

export default function Auth(){
const [verified, setVerified] = useState(false)
const [user, setUser] = useState({data:null, token: null, credential: null})
const [error, setError] = useState({status:false, message: null})

const login = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()  
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      setUser({data: result.user, credential: credential, token: credential.accessToken})
      setVerified(result.user.emailVerified)    
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = GoogleAuthProvider.credentialFromError(error)
      setError({status: true, message: error.message})
  })
}
return(
  <>
    <VerifiedContext.Provider value={verified}>
    <UserContext.Provider value={user}>
    {verified? <App log={setVerified} /> : 
    <div className='sign'>
        <div className='sign-form'>
            <h3 className='sign-form-title'>Lore</h3>
            <p className='sign-subtitle'>a web based chat application.</p>
            <button className='sign-button' onClick={login}>Get Started</button>
        </div>
    </div>}
    </UserContext.Provider>
    </VerifiedContext.Provider>
    </>
)
}

