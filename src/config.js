import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
const firebaseConfig = {
  apiKey: "AIzaSyCGjMM_eEyoNVxRitjhREu_p3fF0s_1kk8",
  authDomain: "lorechatapp.firebaseapp.com",
  projectId: "lorechatapp",
  storageBucket: "lorechatapp.appspot.com",
  messagingSenderId: "571495459746",
  appId: "1:571495459746:web:3f37f533e0968f5f7c20fb",
  measurementId: "G-QQPWMB641E"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)