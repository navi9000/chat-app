import { configureStore } from '@reduxjs/toolkit'
import chatsSlice from '../components/chatsSlice'
import usersSlice from '../components/usersSlice'

import thunkMiddleware from 'redux-thunk'

// д/з 8
import homework8Slice from '../components/homework8Slice'

export default configureStore({
    reducer: {
        chats: chatsSlice,
        users: usersSlice,
        // д/з 8
        homework8: homework8Slice
    },
    middleware: [thunkMiddleware]
})