import { Link } from "react-router-dom";
import "../Header/header.css"
import LogoIcon from "/images/LogoImage.jpg"
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";


function Header() {
    const [token, setToken] = useState(localStorage.getItem("adminToken"))
    useEffect(() => {
        function handleStorage() {
            setToken(localStorage.getItem("adminToken"))
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])
    return (
        <header className="w-screen flex items-center px-0 py-4 justify-around h-[75px] " >
            <Link to={"/"}>
                <div className="flex items-center gap-3 cursor-pointer " >
                    <img src={LogoIcon} className="w-[50px] rounded-full  " alt="Logo Image" />
                    <p className="text-white font-serif " >JULI BAGS <span className="hidden sm:block">👜✨</span> </p>
                </div>
            </Link>
            {
                token &&
                <div className="flex flex-col sm:flex-row gap-3 " >
                    <Link className="text-[10px] sm:text-[16px] font-medium text-white bg-purple-300 ms:px-4 px-2 py-2 rounded-lg hover:scale-105 transition-all duration-150 " to={"/admin/adminMain"}>Admin</Link>
                </div>
            }
            <div className="flex-col sm:flex-row flex items-center gap-2 " >
                <p className="text-white font-serif text-[20px] " >أجمل الحقائب لك <span className="hidden sm:block">✨</span></p>
                <div className="flex items-center justify-center gap-2 text-pink-700 " >
                    <FaTiktok cassName="ring-1 ring-pink-600 rounded-full sm:p-2 p-[2px] ms:text-[35px] text-[20px] cursor-pointer" />
                    <FaInstagram className="ring-1 ring-pink-600 rounded-full sm:p-2 p-[2px] ms:text-[35px] text-[20px] cursor-pointer" />
                    <FaWhatsapp className="ring-1 ring-pink-600 rounded-full sm:p-2 p-[2px] ms:text-[35px] text-[20px] cursor-pointer" />

                </div>
            </div>
        </header>
    )
}

export default Header