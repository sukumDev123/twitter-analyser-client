import firebase from 'firebase/app'
const config = require('./private.json')
export const firebase_init = () => firebase.initializeApp(config)
