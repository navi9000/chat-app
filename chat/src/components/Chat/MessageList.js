import Message from './Message'
import CloseDialogButton from './CloseDialogButton'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    list: {
        height: "90%",
        overflow: "auto",
        padding: "5px 0",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "& > div:last-child": {
            position: "absolute",
            right: 0,
            display: "none"
        },
        "&:hover > div:last-child": {
            display: "unset"
        }
    }
}))

function MessageList(props) {

    const styles = useStyles()

    return (
        <div className={styles.list}>
            {
                props.list.map((object, i) => (
                    <Message key={i} data={object} index={i} dialogId={props.id} />
                ))
            }
            <CloseDialogButton className={styles.closeBtn} chatId={props.id} />
        </div>
    )
}

export default MessageList