import { useState } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import "firebase/compat/database"
import { Link } from "react-router-dom"
import { changeIsAuthenticated } from "../Home/usersSlice"
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    login: {
        margin: "0",
        padding: "0",
        boxSizing: "border-box"
    },
    button: {
        margin: "20px 10px 0 0",
        display: "inline-block",
        border: "none",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "#c20e0e",
        color: "#ffffff",
        fontWeight: "700",
        cursor: "pointer",
    },
    input: {
        border: "none",
        boxSizing: "border-box",
        height: "30px",
        width: "200px",
    },
    feedback: {
        width: "400px",
        margin: "20px auto 0",
        backgroundColor: "rgba(255,0,0,0.4)",
        padding: "1px"
    },
    feedbackSuccess: {
        width: "400px",
        margin: "20px auto 0",
        backgroundColor: "rgba(0,255,0,0.4)",
        padding: "1px"
    }
}))

function Signup() {
    const styles = useStyles()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false)
    const dispatch = useDispatch()

    const firebase = useFirebase()

    const handleUsernameChange = e => {
        setUsername(e.target.value)
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                firebase.set(`users/${userCredential.user.uid}`, { username: username, profilePic: "" })
                setSuccess(true)
                firebase.ref('info').get('numberOfUsers')
                    .then(snapshot => firebase.update('info', { numberOfUsers: snapshot.val().numberOfUsers + 1 }))

                dispatch(changeIsAuthenticated(true))
            }).catch(error => {
                setError(error.message);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Fill in the form below to register new account.</p>
                <div>
                    <input className={styles.input}
                        placeholder="User Name"
                        name="username"
                        type="text"
                        onChange={handleUsernameChange}
                        value={username}
                    />
                </div>
                <div>
                    <input className={styles.input}
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>
                <div>
                    <input className={styles.input}
                        placeholder="Password"
                        name="password"
                        onChange={handlePassChange}
                        value={password}
                        type="password"
                    />
                </div>
                <div>
                    {error && <div className={styles.feedback}><p>{error}</p></div>}
                    {success && <div className={styles.feedbackSuccess}><p>You are registered!</p></div>}
                    <button type="submit" className={styles.button}>Register</button>
                </div>
                <p>
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup