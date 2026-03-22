import { Link, useLocation } from "react-router-dom"
import "./siberBar.css"

function SiberBar() {
    const location = useLocation();

    return (
        <section className="sidebar-aside w-[17%]  top-0 min-h-screen flex flex-col z-40">
            <nav className="flex-1 flex flex-col gap-2 px-3 py-6">
                <Link
                    to="/admin/addProduct"
                    className={`sidebar-link flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                        location.pathname === "/admin/addProduct"
                            ? "sidebar-link-active text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    إضافة منتج
                </Link>

                <Link
                    to="/admin/allProducts"
                    className={`sidebar-link flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                        location.pathname === "/admin/allProducts"
                            ? "sidebar-link-active text-white"
                            : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    تعديل وحذف المنتجات
                </Link>
            </nav>
        </section>
    )
}

export default SiberBar