import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';

export const GoogleSignInButton = () => {
    const loginWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider)
    }
    const check = () => {
        console.log(auth?.currentUser?.email)
    }
    return (
        <Button fullWidth variant="outlined" onClick={loginWithGoogle} startIcon={<GoogleIcon/>}>Continue with Google</Button>
    )
}