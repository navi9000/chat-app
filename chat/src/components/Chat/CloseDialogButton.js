import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import { useUserData } from '../../helpers/customHooks';

const ITEM_HEIGHT = 48;

function CloseDialogButton(props) {
    const activeUserId = useSelector(state => state.users.activeUserId)
    const activeUsername = useUserData(activeUserId, 'username')
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDeleted, setDelete] = useState(false)
    const firebase = useFirebase()
    const history = useHistory()

    useEffect(() => {
        if (isDeleted) {
            firebase.push(`chats/${props.chatId}`, { message: `${activeUsername} deleted this chat`, userId: '000bot' })
            history.push('/')
            return firebase.update(`userChats/${activeUserId}/${props.chatId}`, { chatId: null, messagesRead: null, partnerId: null })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted])

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
        if (window.confirm("Close this dialog?")) {
            setDelete(true)
        }
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>
                    Close Dialog
                </MenuItem>
            </Menu>
        </div>
    )
}

export default CloseDialogButton
