import { createSlice, current } from '@reduxjs/toolkit'

export const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        chatsArr: [
            {
                id: 1,
                dialog: [
                    {
                        userId: 3,
                        text: 'Hello'
                    },
                    {
                        userId: 2,
                        text: 'Hi. How are you'
                    }
                ]
            },
            {
                id: 2,
                dialog: [
                    {
                        userId: 1,
                        text: 'Hi'
                    },
                    {
                        userId: 3,
                        text: 'Hi there.'
                    },
                    {
                        userId: 3,
                        text: 'I\'m wondering. What does jgccjbljfkgxhjcvkhvkvjb mean? Do you have any idea?'
                    }
                ]
            },
            {
                id: 3,
                dialog: [
                    {
                        userId: 1,
                        text: 'Hi'
                    },
                    {
                        userId: 3,
                        text: 'Hi there.'
                    },
                    {
                        userId: 3,
                        text: 'I\'m wondering. What does jgccjbljfkgxhjcvkhvkvjb mean? Do you have any idea?'
                    }
                ]
            }
        ]
    },
    reducers: {
        addMessage: (state, action) => {
            const { id, newChatState } = action.payload
            let index = current(state.chatsArr).findIndex(el => el.id === Number(id))

            state.chatsArr[index].dialog = newChatState
        }
        // toggle: state => {
        //     state.value = !state.value
        //     console.log(state.value)
        // }
    }
})

// Action creators are generated for each case reducer function
// export const { toggle } = checkboxSlice.actions
export const { addMessage } = chatsSlice.actions

export default chatsSlice.reducer