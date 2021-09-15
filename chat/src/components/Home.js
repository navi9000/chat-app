// function Home() {
//     return (
//         <div className="Home">Home Page</div>
//     )
// }




// домашнее задание 8

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { API_URL, setLoading, setData, setError } from './homework8Slice'

function Home() {

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
                setSearchOutput(<p>Error: {e.message}</p>)
            } finally {
                dispatch(setLoading({ loading: false }))
            }

        }
    }

    function clickHandler() {
        dispatch(getFunFact())
    }


    return (
        <div style={{ height: "30%", padding: "10px" }}>
            <button onClick={clickHandler}>Get Fun Fact</button>
            <div>{searchOutput}</div>
        </div>
    )
}

export default Home