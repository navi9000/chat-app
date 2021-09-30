import MessageList from './MessageList'
import InputArea from './InputArea'
import { makeStyles } from '@material-ui/core/styles'

import { useState, useEffect } from 'react'

import { addMessage } from "./chatsSlice"
import { updateMessagesRead } from './usersSlice'

import useChatData from './hooks/useChatData'
import { deleteUserChat } from './usersSlice';

import { useParams, useLocation } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getThemeProps } from '@material-ui/styles'
import firebase from "firebase/compat/app";
import database from "firebase/database"

const useStyles = makeStyles(() => ({
    DialogWrapper: {
        gridColumn: "2 / 3",
        gridRow: "1 / 3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent"
    }
}))

// const db = firebase.database()

// const addMessageWithFirebase = (chatId, message) => async () => {
//     db.ref('messages').child(chatId).child(message.id).set(message)
// }

// const initMessageTracking = () => dispatch => {
//     db.ref('messages').on('child_changed', snapshot => {
//         const payload = getPayloadFromSnapshot(snapshot)
//         dispatch({
//             type: CHANGE_MESSAGES,
//             payload
//         })
//     })
//     db.ref('messages').on('child_added', snapshot => {
//         const payload = getPayloadFromSnapshot(snapshot)
//         dispatch({
//             type: CHANGE_MESSAGES,
//             payload
//         })
//     })
// }

function DialogWrapper() {

    const [shouldUpdate, setShouldUpdate] = useState(false)

    const classes = useStyles()

    const { dialogId } = useParams()

    console.log(dialogId)

    const chat = useChatData(Number(dialogId))

    const activeUserId = useSelector(state => state.users.activeUserId)

    const dispatch = useDispatch()

    const URL = useLocation()

    // useEffect(() => {
    //     console.log("chat")
    //     setShouldUpdate(true)
    // }, [chat])

    // useEffect(() => {
    //     setShouldUpdate(false)
    //     if (shouldUpdate) {
    //         return updateMessagesReadHandler(chat.length)
    //     }
    // }, [URL.pathname])

    // useEffect(() => {
    //     console.log("update")
    //     updateMessagesReadHandler(chat.length)
    // }, [shouldUpdate === true])

    // function updateMessagesReadHandler(num) {
    //     dispatch(updateMessagesRead({ userId: activeUserId, chatId: Number(dialogId), numberOfMessages: num }))
    // }

    const sendMessage = msg => {
        dispatch(addMessage({ id: dialogId, newChatState: [...chat, { userId: activeUserId, text: msg }] }))
        // updateMessagesRead({ userId: activeUserId, chatId: Number(dialogId), numberOfMessages: chat.length + 1 })
        // updateMessagesReadHandler(chat.length + 1)
        // dispatch(sendMessageAsync(msg))
        // setShouldUpdate(false)
    }

    // Send Message Using Async Function
    const sendMessageAsync = msg => (dispatch, getState) => {
        const messages = chat.dialog
        // dispatch(addMessageWithFirebase(dialogId, {
        //     ...msg,
        //     id: `${dialogId}-${messages?.length || 0}-${Date.now()}`,
        // }))


        // dispatch(updateMessagesRead({ userId: activeUserId, chatId: Number(dialogId), numberOfMessages: chat.length + 1 }))
        setTimeout(() => {
            console.log('Bot Message: Message Added')
        }, 1500)

    }

    function deleteChat(user, chat) {
        dispatch(deleteUserChat({ userId: user, chatId: chat }))
    }


    return (
        <div className={classes.DialogWrapper} >
            <MessageList list={chat} id={Number(dialogId)} delete={deleteChat} />
            <InputArea id={dialogId} chat={chat} send={sendMessage} />
        </div>
    )
}

export default DialogWrapper