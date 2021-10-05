import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    authWrapper: {
        display: "inline-block",
        textAlign: "center",
        margin: "0 25%",
        width: "750px",
        height: "100vh",
        backgroundColor: "rgba(50, 50, 50, 0.1)"
    }
}))

function AuthWrapper(props) {

    const styles = useStyles()

    return (
        <div className={styles.authWrapper}>
            {props.content}
        </div>
    )
}

export default AuthWrapper