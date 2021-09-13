import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import useUserData from './hooks/useUserData'
import useChatData from './hooks/useChatData'

import clsx from 'clsx'

const useStyles = makeStyles(() => ({
    st_message: {
        display: "inline-block",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "2px 5px",
        fontSize: "larger",
        maxWidth: "75%"
    },
    st_unread: {
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    st_username: {
        marginRight: "5px",
        fontSize: "smaller",
        color: "#555555"
    },
    st_activeUsername: {
        marginLeft: "5px",
        marginRight: 0
    },
    st_wrapper: {
        padding: "5px 10px",
        textAlign: "right"
    },
    st_activeUser: {
        textAlign: "unset"
    },
    st_beforeUnreadBlock: {
        position: "relative",
        paddingTop: "10px",
        "&::before": {
            content: "'Unread Messages'",
            borderRadius: "10px",
            border: "1px solid #444444",
            backgroundColor: "#bbbbbb",
            position: "absolute",
            top: "-8px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.75em",
            padding: "0 5px"
        }
    }
}))

function Message(props) {

    const { st_message, st_unread, st_username, st_activeUsername, st_activeUser, st_wrapper, st_beforeUnreadBlock } = useStyles()

    const activeUserId = useSelector(state => state.users.activeUserId)

    const userName = useUserData(props.data.userId, 'name')

    const messagesRead = useChatData(props.dialogId, 'messagesRead')

    return (
        <div className={clsx([st_wrapper,
            activeUserId === props.data.userId && st_activeUser,
            props.index >= messagesRead && st_unread,
            props.index == messagesRead && st_beforeUnreadBlock])}>
            <div className={st_message}>{props.data.text}</div>
            <div className={clsx([st_username, activeUserId === props.data.userId && st_activeUsername])}>{userName}</div>
        </div >
    )
}

export default Message