import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL, setLoading, setData, setError } from './homework8Slice'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    wrapper: {
        height: "100px",
    },
    buttonDiv: {
        padding: "10px"
    },
    button: {
        display: "block",
        margin: "0 auto",
        color: "#ffffff",
        backgroundColor: "#c20e0e",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bolder",
        padding: "0 auto"
    },
    output: {
        textAlign: "center",
        padding: "10px"
    }

}))

function Home() {
    const styles = useStyles()
    const [searchOutput, setSearchOutput] = useState((<></>))
    const dispatch = useDispatch()

    const getFunFact = () => async (dispatch, getState) => {
        const { homework8: { loading } } = getState()
        if (!loading) {
            dispatch(setLoading({ loading: true }))
            dispatch(setError({ error: false }))
            setSearchOutput(<p>Loading...</p>)
            try {
                const response = await fetch(API_URL)
                if (!response.ok) {
                    throw new Error('Error: ' + response.status)
                }
                const result = await response.json()
                dispatch(setData({ cat: result.data.cat, fact: result.data.fact }))
                setSearchOutput(
                    <>
                        <h3>Fun Fact</h3>
                        <p><strong>Category:</strong> {getState().homework8.cat}</p>
                        <p><strong>Fact:</strong> {getState().homework8.fact}</p>
                    </>
                )

            } catch (e) {
                dispatch(setError({ error: true }))
                setSearchOutput(<p>Error: {e.message}<br />Another request in 5 sec...</p>)

            } finally {
                dispatch(setLoading({ loading: false }))
                if (getState().homework8.error) {
                    setTimeout(() => dispatch(getFunFact()), 5000)
                }
            }
        }
    }

    function clickHandler() {
        dispatch(getFunFact())
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.buttonDiv}>
                <button onClick={clickHandler} className={styles.button}>Get Fun Fact</button>
            </div>
            <div className={styles.output}>{searchOutput}</div>
        </div>
    )
}

export default Home