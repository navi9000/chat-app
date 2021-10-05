import { useUserData, useCurrentUserChats } from '../../helpers/customHooks'
import Avatar from '@material-ui/core/Avatar'
import { useFirebase, useFirebaseConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    wrapper: {
        display: "flex",
        boxSizing: "border-box",
        padding: "10px",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.1)"
        }
    },
    pic: {
        height: "69px",
        width: "69px"
    },
    p: {
        width: "100%",
        margin: "0 10px",
        textAlign: "start",
        fontWeight: "bolder",
        lineHeight: "64px",
        cursor: "default"
    },
    button: {
        color: "#ffffff",
        backgroundColor: "#c20e0e",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bolder",
        whiteSpace: "nowrap",
        height: "30px",
        width: "128px",
        margin: "19px 0",
        padding: "0 auto",
        "&:disabled": {
            opacity: "0.4",
            cursor: "not-allowed"
        }
    }
}))

function SearchResult(props) {
    const styles = useStyles()
    const username = useUserData(props.userId, 'username')
    const pic = useUserData(props.userId, 'profilePic')
    const userChats = useCurrentUserChats()
    const firebase = useFirebase()
    const currentUserId = useSelector(state => state.users.activeUserId)
    const currentUsername = useUserData(currentUserId, 'username')
    useFirebaseConnect(['info'])
    const info = useSelector(state => state.firebase.data.info)
    const history = useHistory()

    function startNewChat() {
        const newChatId = info.numberOfChats + 1
        firebase.set(`userChats/${currentUserId}/${newChatId}`,
            {
                chatId: newChatId,
                messagesRead: 1,
                partnerId: props.userId
            })
        firebase.set(`userChats/${props.userId}/${newChatId}`,
            {
                chatId: newChatId,
                messagesRead: 0,
                partnerId: currentUserId
            })
        firebase.push(`chats/${newChatId}`, { message: `${currentUsername} started this chat on ${new Date()}`, userId: "000bot" })
        firebase.update(`info`, { numberOfChats: newChatId })
        history.push(`/dialogs/${newChatId}`)
    }

    function buildButton() {
        const isFriend = userChats.some(el => el.partnerId === props.userId)
        return (<button className={styles.button} disabled={isFriend} onClick={startNewChat}>{isFriend ? 'Already a Friend' : 'Start Chatting'}</button>)
    }


    return (
        <div className={styles.wrapper}>
            <Avatar src={pic} className={styles.pic} />
            <p className={styles.p}>{username}</p>
            {buildButton()}
        </div>
    )
}

export default SearchResult