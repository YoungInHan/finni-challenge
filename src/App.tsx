import { onAuthStateChanged, User } from '@firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './auth/protectedRoute';
import { UserBlockedRoute } from './auth/userBlockedRoute';
import { auth } from './config/firebase';
import Home from './pages/Home';
import PatientPage from './pages/Patient';
import SignInPage from './pages/SignIn';

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
