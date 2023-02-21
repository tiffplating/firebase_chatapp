import { auth, provider } from "../firebase-config.js"
import { signInWithPopup, signInAnonymously } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
    const {setIsAuth} = props;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user)
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.log(err);
        }
    }

    const signInAnon = async () => {
        try {
            const result = await signInAnonymously(auth);
            console.log(result.user);
            setIsAuth(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
    <div className="auth">
        <p>Sign in to Continue</p>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <button onClick={signInAnon}>Sign in anonymously</button>
    </div>
    )
}