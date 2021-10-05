import { useFirebaseConnect, isLoaded } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function useUserData(id, type) {

    if (!(type === "username" || type === "profilePic")) {
        throw new Error("Incorrect type. Type must be either 'username' or 'profilePic'")
    }

    useFirebaseConnect([`users/${id}`])
    const userData = useSelector(({ firebase: { data: { users } } }) => users && users[id])

    return userData ? userData[type] : ''
}

export function useCurrentUserChats() {

    const currentUserId = useSelector(state => state.users.activeUserId)
    useFirebaseConnect([`userChats/${currentUserId}`])
    const userChats = useSelector(({ firebase: { ordered: { userChats } } }) => userChats && userChats[currentUserId])

    return userChats ? userChats.map(el => el.value) : []

}

export function useChatData(id, type = 'dialog') {
    useFirebaseConnect([`chats/${id}`])
    const chatData = useSelector(({ firebase: { ordered: { chats } } }) => chats && chats[id])
    const currentUserChats = useCurrentUserChats()

    if (!isLoaded(chatData) && type !== 'messagesRead') {
        switch (type) {
            case 'dialog':
                return []
            case 'numberOfMessages':
                return 0
            case 'lastMessage':
                return ""
            default:
                throw new Error('Error! Incorrect type.')
        }
    }

    function getDialog() {
        return chatData.map(el => el.value)
    }

    switch (type) {
        case 'dialog':
            return getDialog()
        case 'numberOfMessages':
            return getDialog().length
        case 'lastMessage':
            const dialog = getDialog()
            return dialog.length === 0 ? 'No messages yet' : dialog[dialog.length - 1].message
        case 'messagesRead':
            return currentUserChats.find(el => el.chatId === id).messagesRead
        default:
            throw new Error('Error! Incorrect type.')
    }
}

export function useIsCurrentPage(pageId) {
    const currentURL = useLocation()
    const [isCurrent, setIsCurrent] = useState(false)

    useEffect(() => {
        const URL_ARR = currentURL.pathname.split('/')
        if (URL_ARR[1] !== 'dialogs' || Number(URL_ARR[2]) !== pageId) {
            setIsCurrent(false)
        } else {
            setIsCurrent(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentURL])

    return isCurrent
}