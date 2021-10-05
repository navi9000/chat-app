import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { changeIsAuthenticated, setActiveUserId } from '../Home/usersSlice'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
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
    }
}))

function Login() {
    const styles = useStyles()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory()
    const dispatch = useDispatch()

    const handlePassChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                dispatch(setActiveUserId(userCredential.user.uid))
                dispatch(changeIsAuthenticated(true))
                history.push('/')
            })
            .catch(error => {
                setError(error.message);
            })
    }

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <p>Fill in the form below to login to your account.</p>
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
                    <button type="submit" className={styles.button}>Login</button>
                </div>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};


export default Login