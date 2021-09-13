import { createSlice, current } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        value: [
            {
                userId: 1,
                name: "John",
                pic: "https://material-ui.com/static/images/avatar/1.jpg",
                userChats: [
                    {
                        chatId: 1,
                        userId: 3,
                        messagesRead: 1
                    },
                    {
                        chatId: 2,
                        userId: 2,
                        messagesRead: 1
                    }
                ]
            },
            {
                userId: 2,
                name: "Mike",
                pic: "https://material-ui.com/static/images/avatar/2.jpg",
                userChats: []
            },
            {
                userId: 3,
                name: "Kathy",
                pic: "https://material-ui.com/static/images/avatar/3.jpg",
                userChats: []
            }
        ],
        activeUserId: 1
    },
    reducers: {
        updateMessagesRead: (state, action) => {
            const { userId, chatId, numberOfMessages } = action.payload
            state.value.find(el => el.userId === userId).userChats.find(el => el.chatId === chatId).messagesRead = numberOfMessages
        },
        deleteUserChat: (state, action) => {
            const { userId, chatId } = action.payload
            const userIndex = current(state.value).findIndex(el => el.userId === userId)
            const newArr = current(state.value[userIndex].userChats).filter(el => el.chatId !== chatId)
            state.value[userIndex].userChats = newArr
            console.log(state.value[userIndex].userChats)
        }
    }
})

export const { updateMessagesRead, deleteUserChat } = usersSlice.actions
export default usersSlice.reducer