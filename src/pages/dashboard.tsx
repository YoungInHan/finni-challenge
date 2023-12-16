import { signOut } from "@firebase/auth"
import { auth } from "../config/firebase"

export const Dashboard = () => {
    const handleSignOut = async () => {
        const k = await signOut(auth)
        console.log(k)
    }
    return (
        <section>
            <h2>dash</h2>
            <button onClick={handleSignOut}>signout</button>
        </section>
    )
}