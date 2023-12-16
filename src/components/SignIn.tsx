import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from '@firebase/util';
import { mapAuthCodeToMessage } from '../utils/firebase-auth-errors'
import { Alert } from '@mui/material';

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignUp, setIsSignUp] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event)
        try {
            if (isSignUp) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            } else {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
            }
            navigate('/')
        } catch (e) {
            if (e instanceof FirebaseError) {
                setErrorMsg(mapAuthCodeToMessage(e))
            }
        }
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
        sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        </Avatar>
        <Typography component="h1" variant="h5">
        {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                onChange={e => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                onChange={e => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
        </Box>
        <Grid container>
                <Grid item>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Have an account already? Sign In" : "Don't have an account? Sign Up"}
                </Link>
                </Grid>
            </Grid>
    </Box>
    </Container>
  );
}

export default SignIn