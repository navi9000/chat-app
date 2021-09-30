import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { useState, useEffect } from 'react'

import DialogLink from './DialogLink';

// import useCurrentUserChats from './hooks/useCurrentUserChats';


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

    const [isLoaded, setIsLoaded] = useState(false)
    const [chats, setChats] = useState([])


    // Не уверен, что логика здесь правильная (м.б. добавить return?)
    useEffect(() => {
        getCurrentUserChats()
            .then(() => {
                setIsLoaded(true)
                console.log("effect", chats)
            })
    }, [chats])

    const currentUserId = useSelector(state => state.users.activeUserId)
    const firebase = useFirebase()

    async function getCurrentUserChats() {
        try {
            const snapshot = await firebase.ref('userChats').get(currentUserId)
            const result = snapshot.val()[currentUserId]
            setChats(await Object.keys(result).map(el => result[el]))
        } catch (e) {
            console.warn(e)
        }
    }

    function renderSide() {
        return chats.map(chat => (
            <DialogLink chat={chat} key={chat.chatId} />
        ))
    }

    return (
        <div className={styles.list} children={isLoaded ? renderSide() : (<div>Loading...</div>)}></div>
    )
}

export default SideList