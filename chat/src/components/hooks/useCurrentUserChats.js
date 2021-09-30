import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

async function useCurrentUserChats() {

    const currentUserId = useSelector(state => state.users.activeUserId)
    const firebase = useFirebase()

    try {
        const snapshot = await firebase.ref('userChats').get(currentUserId)
        const result = snapshot.val()[currentUserId]
        console.log(Object.keys(result).map(el => result[el]))
        return Object.keys(result).map(el => result[el])
    } catch (e) {
        console.log(e)
        return []
    }

}

export default useCurrentUserChats