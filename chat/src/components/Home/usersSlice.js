import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        activeUserId: null,
        isAuthenticated: false
    },
    reducers: {
        changeIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setActiveUserId: (state, action) => {
            state.activeUserId = action.payload
        }
    }
})

export const { changeIsAuthenticated, setActiveUserId } = usersSlice.actions
export default usersSlice.reducer