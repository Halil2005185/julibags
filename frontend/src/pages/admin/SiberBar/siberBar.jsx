import { Link, useLocation } from "react-router-dom"
import "./siberBar.css"
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";


function SiberBar() {
    const location = useLocation();
    const [toggle, setToggle] = useState(false)
    return (
        <>
            <span className="absolute left-0  h-screen  ">
                <IoMdMenu onClick={() => setToggle(false)} className="text-[50px] cursor-pointer text-[#c77dff] mx-4 mt-2 " />
            </span>
            <section className={`fixed ${toggle ? "right-[-240px]" : "right-0"} w-[240px] transition-all duration-150 sidebar-aside bg-black top-0 h-screen flex flex-col pt-5 z-50 `}>
                <IoMdClose onClick={() => setToggle(!toggle)} className="text-[#c77dff] z-50 text-[40px] cursor-pointer self-end ml-4 mt-1 " />
                <nav className="flex-1 flex flex-col gap-2 px-3 py-3">
                    <Link
                        onClick={() => setToggle(true)}
                        to="/admin/addProduct"
                        className={`sidebar-link flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${location.pathname === "/admin/addProduct"
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
                        onClick={() => setToggle(true)}

                        to="/admin/allProducts"
                        className={`sidebar-link flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 ${location.pathname === "/admin/allProducts"
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
        </>
    )
}

export default SiberBar