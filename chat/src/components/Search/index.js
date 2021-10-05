import { useFirebaseConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core'

import SearchResult from './SearchResult'

const useStyles = makeStyles(() => ({
    wrapper: {
        height: "100px",
        textAlign: "center",
        boxSizing: "border-box",
        padding: "10px 0"
    },
    p: {
        margin: "0 0 10px",
        color: "#c20e0e",
        fontWeight: "bolder",
        cursor: "default"
    },
    input: {
        border: "none",
        boxSizing: "border-box",
        height: "30px",
        width: "200px",
        marginBottom: "10px"
    },
    results: {
        overflow: "auto"
    }
}))

function Search() {
    const styles = useStyles()
    const [inputText, setInputText] = useState('')
    useFirebaseConnect('users')
    const fetchedUsersData = useSelector(state => state.firebase.ordered.users)
    const activeUserId = useSelector(state => state.users.activeUserId)

    let usersArray = []
    if (fetchedUsersData) {
        if (fetchedUsersData instanceof Array) {
            usersArray = fetchedUsersData.map(el => { return { userId: el.key, screenName: el.value.username } })
        } else {
            usersArray = Object.keys(fetchedUsersData).map(el => { return { userId: el, screenName: fetchedUsersData[el][1].value } })
        }
    }

    function findUsers() {
        if (inputText === '') {
            return []
        }

        const matchedUsers = usersArray.filter(el => new RegExp('^' + inputText, 'i').test(el.screenName) && el.userId !== activeUserId && el.userId !== "000bot")
        if (matchedUsers.length === 0) {
            return (<p>No matches</p>)
        }

        return matchedUsers.map(el => (<SearchResult key={el.userId} userId={el.userId} />))
    }

    return (
        <div className={styles.wrapper}>
            <div>
                <p className={styles.p}>Find a chat partner</p>
                <input className={styles.input} type="text" value={inputText} onChange={e => setInputText(e.target.value)} />
            </div>
            <div className={styles.results}>
                {findUsers()}
            </div>
        </div>
    )
}

export default Search