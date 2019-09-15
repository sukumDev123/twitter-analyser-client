import firebase from 'firebase/app'
import 'firebase/database'
const handleDataB = _ref => firebase.database().ref(_ref)
export const db_read_namefiles = () => handleDataB('filesName')
