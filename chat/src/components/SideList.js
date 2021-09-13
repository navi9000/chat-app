import { makeStyles } from '@material-ui/core/styles'

import DialogLink from './DialogLink';

import useCurrentUserChats from './hooks/useCurrentUserChats';

import { useSelector, useDispatch } from 'react-redux'
// import { toggle } from './features/checkbox/checkboxSlice'

const useStyles = makeStyles(() => ({
    list: {
        gridColumn: "1 / 2",
        gridRow: "2 / 3",
        backgroundColor: "transparent",
        borderRight: "1px solid #c20e0e"
    }
}))

function SideList(props) {

    const styles = useStyles()

    // const chats = useSelector(state => state.chats.chatsArr)

    const chats = useCurrentUserChats()
    // const users = useSelector(state => state.users.value)
    // const dispatch = useDispatch()

    function renderSide() {
        return chats.map(chat => (
            // <Box key={el.id}>
            //     <Badge badgeContent={getUnreadMessages(el.dialog)} color="primary">
            //         <Avatar src={el.pic} />
            //     </Badge>
            //     <div>{el.dialog.length == 0 ? "No messages" : el.dialog[el.dialog.length - 1].text}</div>
            // </Box>
            <DialogLink chat={chat} key={chat.id} />
        ))
    }

    return (
        <div className={styles.list} children={renderSide()}></div>
    )
}

export default SideList