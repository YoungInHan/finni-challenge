import { Navigate } from "react-router-dom"

export const UserBlockedRoute = ({ children, user}: any) => {
    console.log(user)
    return user ? <Navigate to='/'></Navigate> : children
}