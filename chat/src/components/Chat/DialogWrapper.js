import MessageList from './MessageList'
import InputArea from './InputArea'
import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useRef } from 'react'
import { useChatData } from '../../helpers/customHooks'

import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

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

function DialogWrapper() {

    const classes = useStyles()
    const { dialogId } = useParams()
    const firebase = useFirebase()
    const chat = useChatData(Number(dialogId))
    const activeUserId = useSelector(state => state.users.activeUserId)
    const chatRef = useRef({ wasChat: false })

    useEffect(() => {
        if (chatRef.current.wasChat && chatRef.current.numberOfMessages !== 0) {
            firebase.update(`userChats/${activeUserId}/${chatRef.current.chatId}`, { messagesRead: chatRef.current.numberOfMessages })
        }
        chatRef.current = { chatId: dialogId, numberOfMessages: chat.length, wasChat: true }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => firebase.update(`userChats/${activeUserId}/${chatRef.current.chatId}`, { messagesRead: chatRef.current.numberOfMessages }), [])

    const sendMessage = msg => {
        chatRef.current.numberOfMessages = chat.length + 1
        firebase.push(`chats/${dialogId}`, { message: msg, userId: activeUserId })
    }

    return (
        <div className={classes.DialogWrapper} >
            <MessageList list={chat} id={Number(dialogId)} />
            <InputArea id={dialogId} chat={chat} send={sendMessage} />
        </div>
    )
}

export default DialogWrapper