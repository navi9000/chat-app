import React, { useState, useEffect, useRef } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from "react-redux"
import { useParams } from 'react-router-dom'


const useStyles = makeStyles(() => ({
    area: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent"
    },
    text: {
        padding: "10px",
        margin: "0 10px",
        display: "inline-block",
        width: "100%",
        border: "none",
        outline: "none",
        backgroundColor: "transparent"
    },
    button: {
        margin: "0 10px 0 0",
        display: "inline-block",
        border: "none",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "#c20e0e",
        color: "#ffffff",
        fontWeight: "700",
        cursor: "pointer"
    }
}))

function InputArea(props) {


    const styles = useStyles()

    const [inputMessage, setInputMessage] = useState('');

    const onSendMessage = () => {
        if (inputMessage) {
            props.send(inputMessage)
            setInputMessage('');
        }
    }

    // const arrLength = props.arr.length;

    // useEffect(() => setTimeout(() => {
    //     if (arrLength > 0) {
    //         console.log('Message added');
    //     }
    // }, 1500), [arrLength]);

    // const textInput = useRef()

    // focus() {
    //     this.textInput.current.focus()
    // }

    return (
        <div className={styles.area} >
            <input placeholder="Enter your message" className={styles.text} value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyDown={({ key }) => { if (key === 'Enter') onSendMessage() }} />
            <button className={styles.button} onClick={onSendMessage}>Send</button>
        </div>
    )
}

export default InputArea