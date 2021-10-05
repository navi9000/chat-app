import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    list: {
        gridColumn: "1 / 2",
        gridRow: "2 / 3",
        backgroundColor: "transparent",
        borderRight: "1px solid #c20e0e"
    }
}))

function SearchAside() {
    const styles = useStyles()

    return (
        <div className={styles.list}></div>
    )
}

export default SearchAside