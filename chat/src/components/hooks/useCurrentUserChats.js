import { useSelector } from 'react-redux';

function useCurrentUserChats() {

    const currentUserId = useSelector(state => state.users.activeUserId)
    const users = useSelector(state => state.users.value)

    return users.find(el => el.userId === currentUserId).userChats

}

export default useCurrentUserChats