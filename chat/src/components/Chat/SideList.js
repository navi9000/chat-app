import { makeStyles } from '@material-ui/core/styles'
import DialogLink from './DialogLink'
import { useCurrentUserChats } from '../../helpers/customHooks'

const useStyles = makeStyles(() => ({
    list: {
        gridColumn: "1 / 2",
        gridRow: "2 / 3",
        backgroundColor: "transparent",
        borderRight: "1px solid #c20e0e"
    }
}))

function SideList() {

    const styles = useStyles()

    const chats = useCurrentUserChats()

    function renderSide() {
        return chats.map(chat => (
            <DialogLink chat={chat} key={chat.chatId} />
        ))
    }

    return (
        <div className={styles.list} children={renderSide()}></div>
    )
}

export default SideList