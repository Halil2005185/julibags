import { Link } from "react-router-dom";
import "../Header/header.css"
import LogoIcon from "/images/LogoImage.jpg"
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const [token, setToken] = useState(localStorage.getItem("adminToken"))
    const navigate = useNavigate()
    useEffect(() => {
        function handleStorage() {
            setToken(localStorage.getItem("adminToken"))
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [])
    function LongOut() {
        localStorage.removeItem("adminToken")
        localStorage.removeItem("tokenExpiry")
        window.dispatchEvent(new Event("storage"))

        navigate("/admin/adminLogin101")
    }
    return (
        <header className=" flex items-center px-4 sm:px-8 py-3 justify-between h-[80px] shadow-lg relative overflow-hidden">
            <Link to={"/"}>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <img
                        src={LogoIcon}
                        className="w-[50px] h-[50px] rounded-full object-cover border-2 border-white/40 shadow-md group-hover:border-white/80 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300"
                        alt="Logo Image"
                    />
                    <div className="flex flex-col">
                        <p className="text-white font-bold text-lg tracking-widest drop-shadow-md">
                            JULI BAGS
                        </p>
                        <span className="text-white/60 text-[10px] tracking-[0.3em] font-light hidden sm:block">
                            PREMIUM COLLECTION
                        </span>
                    </div>
                </div>
            </Link>

            {
                token &&
                <div className="flex items-center absolute sm:static z-40 left-0 ">
                    <Link
                        className="text-[11px] sm:text-[14px] font-semibold text-white bg-black/20 backdrop-blur-sm border border-white/20 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-black/30 hover:border-white/40 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-lg"
                        to={"/admin/adminMain"}
                    >
                        ⚡ Admin
                    </Link>
                    <button
                        onClick={LongOut}
                        className="text-[11px] sm:text-[14px] font-semibold text-white bg-black/20 backdrop-blur-sm border border-white/20 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-black/30 hover:border-white/40 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-lg"                    >
                        longOut
                    </button>
                </div>
            }

            <div className="flex items-center gap-4">
                <p className="text-white font-serif text-[16px] sm:text-[20px] hidden sm:block drop-shadow-md font-semibold">
                    أجمل الحقائب لك ✨
                </p>
                <div className="flex items-center justify-center gap-2">
                    <a href="https://www.tiktok.com/@juli.bags?_r=1&_t=ZS-94zJ1SB1iEB">
                        <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white cursor-pointer hover:bg-white/30 hover:border-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                            <FaTiktok className="text-[15px] sm:text-[17px]" />
                        </span>
                    </a>
                    <a href="https://www.instagram.com/juli.bags24?igsh=MmFhdXJqNzk1emRn">
                        <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white cursor-pointer hover:bg-white/30 hover:border-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                            <FaInstagram className="text-[15px] sm:text-[17px]" />
                        </span>
                    </a>
                    <a href="https://wa.me/905342170870">
                        <span className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white cursor-pointer hover:bg-white/30 hover:border-white/40 hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                            <FaWhatsapp className="text-[15px] sm:text-[17px]" />
                        </span>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header