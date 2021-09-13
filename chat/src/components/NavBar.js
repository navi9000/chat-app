import NavButton from './NavButton'

import { makeStyles } from '@material-ui/core/styles'

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

    return (
        <div className={styles.navBar}>
            <NavButton fa="home" link="/" text="Home Page" />
            <NavButton fa="user" link="/users" text="User Profile" />
            <NavButton fa="search" link="/search" text="Find User" />
            <NavButton fa="door-open" link="/login" text="Log Out" />
        </div>
    )
}

export default NavBar