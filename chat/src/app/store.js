import { configureStore } from '@reduxjs/toolkit'
import chatsSlice from '../components/chatsSlice'
import usersSlice from '../components/usersSlice'

import thunkMiddleware from 'redux-thunk'

export default configureStore({
    reducer: {
        chats: chatsSlice,
        users: usersSlice
    },
    middleware: [thunkMiddleware]
})