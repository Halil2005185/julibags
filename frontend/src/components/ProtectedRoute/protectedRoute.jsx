import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, redirectIfAuth = false }) {
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem("adminToken")
        const expiry = localStorage.getItem("tokenExpiry")
        const expired = !expiry || Date.now() > parseInt(expiry)

        if (expired && savedToken) {
            localStorage.removeItem("adminToken")
            localStorage.removeItem("tokenExpiry")
            return null
        }
        return savedToken
    })

    useEffect(() => {
        function handleStorage() {
            setToken(localStorage.getItem("adminToken"))
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])

    if (redirectIfAuth && token) return <Navigate to="/admin/adminMain" />
    if (!redirectIfAuth && !token) return <Navigate to="/admin/adminLogin101" />

    return children
}

export default ProtectedRoute