import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core';
import { useUserData, useIsCurrentPage, useChatData } from '../../helpers/customHooks'

import { Link } from 'react-router-dom'

import clsx from 'clsx'

const useStyles = makeStyles(() => ({
    container: {
        display: "grid",
        gridTemplateColumns: "3fr 8fr",
        gridTemplateRows: "1fr",
        padding: "10px",
        gridGap: "10px",
        textDecoration: "none",
        color: "#000000"
    },
    avatar: {
        width: "69px",
        height: "69px"
    },
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    p: {
        margin: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "200px",
        textOverflow: "ellipsis"
    },
    active: {
        backgroundColor: "rgba(0,0,0,0.1)"
    }
}))

function DialogLink(props) {

    const userName = useUserData(props.chat.partnerId, 'username')
    const userPic = useUserData(props.chat.partnerId, 'profilePic')

    const styles = useStyles()

    const isCurrent = useIsCurrentPage(props.chat.chatId)

    const numberOfMessages = useChatData(props.chat.chatId, 'numberOfMessages')
    const lastMessage = useChatData(props.chat.chatId, 'lastMessage')

    return (
        <Link to={'/dialogs/' + props.chat.chatId} key={props.chat.chatId} className={clsx([styles.container, isCurrent && styles.active])}>
            <div>
                <Badge badgeContent={Math.max(numberOfMessages - props.chat.messagesRead, 0)} color="primary" overlap="circular">
                    <Avatar src={userPic} className={styles.avatar} />
                </Badge>
            </div>
            <div className={styles.flexContainer}>
                <p className={styles.p}><strong>{userName}</strong></p>
                <p className={styles.p}>{lastMessage}</p>
            </div>
        </Link>
    )
}

export default DialogLink