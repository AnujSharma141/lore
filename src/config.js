import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
const firebaseConfig = {
  apiKey: "",
  authDomain: "lorechatapp.firebaseapp.com",
  projectId: "lorechatapp",
  storageBucket: "lorechatapp.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)