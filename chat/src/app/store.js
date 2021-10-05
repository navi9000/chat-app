import { configureStore, combineReducers } from '@reduxjs/toolkit'
import usersSlice from '../components/Home/usersSlice'

import thunkMiddleware from 'redux-thunk'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import firebase from "firebase/compat/app"
import { firebaseConfig } from '../firebase/index';
import { firebaseReducer } from 'react-redux-firebase'
import 'firebase/compat/auth'
import homework8Slice from '../components/Home/homework8Slice'

firebase.initializeApp(firebaseConfig)

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    firebase: firebaseReducer,
    users: usersSlice,
    homework8: homework8Slice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunkMiddleware]
})