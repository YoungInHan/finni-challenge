import { useEffect, useState } from 'react';
import { auth } from './config/firebase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged, User } from '@firebase/auth';
import { ProtectedRoute } from './components/protectedRoute';
import { UserBlockedRoute } from './components/userBlockedRoute';
import Home from './pages/home';
import SignInPage from './pages/SignIn';
import PatientPage from './pages/patient';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);
  if (isFetching) {
    return <section></section>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Home></Home>
            </ProtectedRoute>
          }></Route>
        <Route
          path="/auth/login"
          element={
            <UserBlockedRoute user={user}>
              <SignInPage isSignUp={false}></SignInPage>
            </UserBlockedRoute>
          }></Route>
        <Route
          path="/auth/signup"
          element={
            <UserBlockedRoute user={user}>
              <SignInPage isSignUp={true}></SignInPage>
            </UserBlockedRoute>
          }></Route>
        <Route
          path="/new"
          element={
            <ProtectedRoute user={user}>
              <PatientPage edit={false}></PatientPage>
            </ProtectedRoute>
          }></Route>
        <Route
          path="/patient/:id"
          element={
            <ProtectedRoute user={user}>
              <PatientPage edit={true}></PatientPage>
            </ProtectedRoute>
          }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
