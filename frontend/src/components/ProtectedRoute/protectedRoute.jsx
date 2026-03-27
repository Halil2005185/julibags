import { useEffect } from "react"
import { useState } from "react"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
    const [token, setToken] = useState(localStorage.getItem("adminToken"))
    useEffect(() => {
        function handleStorage() {
            setToken(localStorage.getItem("adminToken"))
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])
    if (token) {
        return <Navigate to={"/admin/adminMain"} />
    }
    else if (!token) {
        return <Navigate to={"/admin/adminLogin101"} />
    }
    else {
        return children
    }
}
export default ProtectedRoute