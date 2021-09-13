import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    navButton: {
        cursor: "pointer",
        textAlign: "center",
        display: "grid",
        gridTemplateColumns: "3fr 8fr",
        padding: "5px 10px",
        textDecoration: "none",
        color: "#c20e0e",
        "&:hover": {
            color: "#ffffff",
            backgroundColor: "#c20e0e"
        }
    },
    i: {
        lineHeight: "20px"
    },
    text: {
        margin: 0,
        textAlign: "start",
        fontWeight: "bolder"

    }
}))

function NavButton(props) {

    const styles = useStyles()

    return (
        <Link to={props.link} className={styles.navButton}>
            <i className={"fas fa-" + props.fa + " fa-lg " + styles.i}></i>
            <p className={styles.text}>{props.text}</p>
        </Link>
    )

}

export default NavButton