import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const ITEM_HEIGHT = 48;



function CloseDialogButton(props) {
    const activeUserId = useSelector(state => state.users.activeUserId)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);


    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null)
        if (window.confirm("Close this dialog?")) {
            props.delete(activeUserId, props.chatId)
            // dispatch(deleteUserChat({ userId: activeUserId, chatId: props.chatId }))
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
