import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { Link, useHistory } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { changeIsAuthenticated, setActiveUserId } from './usersSlice';

function Login() {
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
        <div>
            <form onSubmit={handleSubmit}>
                <p>Fill in the form below to login to your account.</p>
                <div>
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                </div>
                <div>
                    <input
                        placeholder="Password"
                        name="password"
                        onChange={handlePassChange}
                        value={password}
                        type="password"
                    />
                </div>
                <div>
                    {error && <p>{error}</p>}
                    <button type="submit">Login</button>
                </div>
                <hr />
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};


export default Login