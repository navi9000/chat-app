import NavBar from '../components/NavBar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    mainWrapper: {
        margin: "0 25%",
        width: "750px",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "2fr 3fr",
        gridTemplateRows: "1fr 14fr",
        backgroundColor: "rgba(50, 50, 50, 0.1)"
    }
}))

function MainWrapper(props) {

    const styles = useStyles()

    return (
        <div className={styles.mainWrapper}>
            <NavBar />
            {props.aside}
            {props.content}
        </div>
    )
}

export default MainWrapper