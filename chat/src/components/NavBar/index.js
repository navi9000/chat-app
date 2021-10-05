import NavButton from './NavButton'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { changeIsAuthenticated, setActiveUserId } from '../Home/usersSlice'
import { useEffect, useState } from 'react'

const useStyles = makeStyles(() => ({
    navBar: {
        backgroundColor: "transparent",
        gridColumn: "1 / 2",
        gridRow: "1 / 2",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "5px 0",
        borderRight: "1px solid #c20e0e"
    }
}))

function NavBar() {

    const styles = useStyles()

    const dispatch = useDispatch()
    const firebase = useFirebase()
    const [shouldLogout, setShouldLogout] = useState(false)
    useEffect(() => {
        if (shouldLogout) {
            firebase.logout()
            return afterLogout()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldLogout])

    function logoutHandler(e) {
        e.preventDefault()
        setShouldLogout(true)
    }

    function afterLogout() {
        dispatch(changeIsAuthenticated(false))
        dispatch(setActiveUserId(null))
        setShouldLogout(false)
    }

    return (
        <div className={styles.navBar}>
            <NavButton fa="home" link="/" text="Home Page" />
            <NavButton fa="search" link="/search" text="Find User" />
            <NavButton fa="door-open" link="/login" text="Log Out" clickHandler={logoutHandler} />
        </div>
    )
}

export default NavBar