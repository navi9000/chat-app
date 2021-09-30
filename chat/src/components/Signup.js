import { useState } from 'react'
import { useFirebase } from 'react-redux-firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
// import "firebase/compat/auth"
import "firebase/compat/database"
// import { getDatabase, ref, set, get, child, update } from "firebase/database"
import { Link } from "react-router-dom"
import { changeIsAuthenticated } from "./usersSlice"
import { useSelector, useDispatch } from 'react-redux';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
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
                firebase.ref('info').get('numberOfUsers')
                    .then(snapshot => firebase.update('info', { numberOfUsers: snapshot.val().numberOfUsers + 1 }))


                // const db = getDatabase()
                // const infoRef = ref(db, 'info')
                // get(infoRef).then(snapshot => {
                //     const numberOfUsers = snapshot.val().numberOfUsers
                //     const usersRef = ref(db, 'users/' + userCredential.user.reloadUserInfo.localId)
                //     set(usersRef, {
                //         username: username,
                //         profilePic: ""
                //     })

                //     const updates = {}
                //     updates['info/numberOfUsers'] = numberOfUsers + 1
                //     update(ref(db), updates)

                // })

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
                    <input
                        placeholder="User Name"
                        name="username"
                        type="text"
                        onChange={handleUsernameChange}
                        value={username}
                    />
                </div>
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
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup