import { useSelector } from 'react-redux';

function useUserData(id, type) {

    if (!(type === "name" || type === "pic")) {
        throw new Error("Incorrect type. Type must be either 'name' or 'pic'")
    }

    const users = useSelector(state => state.users.value)

    return users.find(el => el.userId == id)[type]
}

export default useUserData