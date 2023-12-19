import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children, user}: any) => {
    console.log(user)
    return user ? children : <Navigate to='/auth/login'></Navigate>
}