import "../Header/header.css"
import LogoIcon from "/images/LogoImage.jpg"
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";


function Header() {
    return (
        <header className="w-screen flex items-center px-0 py-4 justify-around " >
            <div className="flex items-center gap-3 cursor-pointer " >
                <img src={LogoIcon} className="w-[50px] rounded-full  " alt="Logo Image" />
                <p className="text-white font-serif " >JULI BAGS <span>👜✨</span> </p>
            </div>

            <div className="flex items-center gap-2 " >
                <p className="text-white font-serif text-[20px] " >أجمل الحقائب لك ✨</p>
                <div className="flex items-center justify-center gap-2 text-pink-700 " >
                    <FaTiktok className="ring-1 ring-pink-600 rounded-full p-2 text-[35px] cursor-pointer " />
                    <FaInstagram className="ring-1 ring-pink-600 rounded-full p-2 text-[35px] cursor-pointer" />
                    <FaWhatsapp className="ring-1 ring-pink-600 rounded-full p-2 text-[35px] cursor-pointer" />

                </div>
            </div>
        </header>
    )
}

export default Header