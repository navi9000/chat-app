import { useSelector } from 'react-redux';
import useCurrentUserChats from './useCurrentUserChats'

function useChatData(id, type = 'dialog') {
    // const chats = useSelector(state => state.chats.chatsArr)
    const chats = useSelector(state => state.firebase.chats.id)
    console.log(chats)
    const currentUserChats = useCurrentUserChats()

    function getDialog() {
        return chats.find(el => el.id === id).dialog
    }

    switch (type) {
        case 'dialog':
            return getDialog()
        case 'numberOfMessages':
            return getDialog().length
        case 'lastMessage':
            const dialog = getDialog()
            return dialog.length === 0 ? 'No messages yet' : dialog[dialog.length - 1].text
        case 'messagesRead':
            return currentUserChats.find(el => el.chatId === id).messagesRead
        default:
            throw new Error('Error! Incorrect type.')
    }
}

export default useChatData