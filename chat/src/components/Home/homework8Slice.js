import { createSlice } from '@reduxjs/toolkit'

export const API_URL = "https://asli-fun-fact-api.herokuapp.com"

export const homework8Slice = createSlice({
    name: "homework8",
    initialState: {
        loading: false,
        error: false,
        cat: null,
        fact: null
    },
    reducers: {
        setLoading: (state, action) => {
            const { loading } = action.payload
            state.loading = loading
        },
        setError: (state, action) => {
            const { error } = action.payload
            state.error = error
        },
        setData: (state, action) => {
            const { cat, fact } = action.payload
            state.cat = cat
            state.fact = fact
        }
    }
})

export const { setLoading, setError, setData } = homework8Slice.actions
export default homework8Slice.reducer