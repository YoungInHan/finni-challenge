import React, { useEffect, useState } from 'react';
import { auth } from './config/firebase'
import SignIn from './components/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/dashboard';
import { onAuthStateChanged, User } from '@firebase/auth';
import { ProtectedRoute } from './components/protectedRoute';
import { UserBlockedRoute } from './components/userBlockedRoute';

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
      <Dashboard></Dashboard>
      </ProtectedRoute>}></Route>
      <Route path='/login' element={<UserBlockedRoute user={user}>
      <SignIn></SignIn>
      </UserBlockedRoute>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
