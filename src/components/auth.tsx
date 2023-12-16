import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

export const Auth = () => {
    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
    }
    const logout = async () => {
        await signOut(auth)
    }
    const check = () => {
        console.log(auth?.currentUser?.email)
    }
    return (
        <div>
            <button onClick={check}>check</button>
            <button onClick={loginWithGoogle}> signin with google</button>
            <button onClick={logout}> signout</button>
        </div>

    )
}