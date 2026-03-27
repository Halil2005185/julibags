import { useEffect } from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, redirectIfAuth = false }) {
    const [token, setToken] = useState(localStorage.getItem("adminToken"))
    useEffect(() => {
        function handleStorage() {
            setToken(localStorage.getItem("adminToken"))
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])
    if (redirectIfAuth && token) {
        return <Navigate to="/admin/adminMain" />
    }

    if (!redirectIfAuth && !token) {
        return <Navigate to="/admin/adminLogin101" />
    }
    return children
}
export default ProtectedRoute