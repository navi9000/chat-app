import { configureStore } from '@reduxjs/toolkit'
import chatsSlice from '../components/chatsSlice'
import usersSlice from '../components/usersSlice'

import thunkMiddleware from 'redux-thunk'

import firebase from "firebase/compat/app"
import { firebaseConfig } from '../firebase/index';
import { firebaseReducer } from 'react-redux-firebase'
import 'firebase/compat/auth'

// д/з 8
import homework8Slice from '../components/homework8Slice'

firebase.initializeApp(firebaseConfig)

export default configureStore({
    reducer: {
        firebase: firebaseReducer,
        chats: chatsSlice,
        users: usersSlice,
        // д/з 8
        homework8: homework8Slice
    },
    middleware: [thunkMiddleware]
})