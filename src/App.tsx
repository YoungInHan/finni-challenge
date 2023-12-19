import React, { useEffect, useState } from 'react';
import { auth } from './config/firebase'
import SignIn from './components/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/dashboard';
import { onAuthStateChanged, User } from '@firebase/auth';
import { ProtectedRoute } from './components/protectedRoute';
import { UserBlockedRoute } from './components/userBlockedRoute';
import Home from './pages/home'
import JoySignInSideTemplate from './pages/SignIn';
import { CssVarsProvider } from '@mui/joy';
import { Css } from '@mui/icons-material';
import Patient from './pages/patient';
import EditPatient from './components/EditPatient';

function App() {
  const [user, setUser] = useState<User|null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(true)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u)
      } else {
        setUser(null)
      }
      setIsFetching(false)
    })
    return () => unsubscribe()
  }, [])
  if (isFetching) {
    return <section></section>
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route index path='/' element={<ProtectedRoute user={user}>
      <Home></Home>
      </ProtectedRoute>}></Route>
      <Route path='/auth/login' element={<UserBlockedRoute user={user}><JoySignInSideTemplate isSignUp={false}></JoySignInSideTemplate>
      </UserBlockedRoute>}></Route>
      <Route path='/auth/signup' element={<UserBlockedRoute user={user}><JoySignInSideTemplate isSignUp={true}></JoySignInSideTemplate></UserBlockedRoute>}></Route>
      <Route path='/new' element={<ProtectedRoute user={user}><Patient edit={false}></Patient></ProtectedRoute>}></Route>
      <Route path="/patient/:id" element={<ProtectedRoute user={user}><Patient edit={true}></Patient></ProtectedRoute>} ></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
