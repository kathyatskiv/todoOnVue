import firebase from 'firebase/app'
import 'firebase/firestore'
import VueFire from 'vuefire'

const config = {
    apiKey: "AIzaSyCYQYnBgn6jbhR8SvgDy6WM4HljFKXhHgg",
    authDomain: "diary-5b909.firebaseapp.com",
    databaseURL: "https://diary-5b909.firebaseio.com",
    projectId: "diary-5b909",
    storageBucket: "diary-5b909.appspot.com",
    messagingSenderId: "1053789331520"
  };

 //Vue.use(VueFire)
  const firebaseApp = firebase.initializeApp(config)

  const firestore = firebaseApp.firestore()
  firestore.settings({ timestampsInSnapshots: true })

  export default firestore
  export const db = firebase.firestore()

//     firebase.initializeApp({
//     projectId: 'test-base-e95bf', 
//     databaseURL: 'https://test-base-e95bf.firebaseio.com'
// })