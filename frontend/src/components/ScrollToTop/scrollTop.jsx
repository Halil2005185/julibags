import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ScrollTop() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        const hanldeScroll = () => {
            if (window.scrollY > 200) {
                setShow(true)
            }
            else {
                setShow(false)
            }
        }

        window.addEventListener("scroll", hanldeScroll)

        return () => {
            removeEventListener("scroll", hanldeScroll)
        }
    }, [])

    function GoToTop() {
        window.scroll({
            top: 0,
            behavior: "smooth"
        })
    }
    return <section className={`fixed bottom-2 ${show ? "opacity-100 -translate-y-[15px] " : " opacity-0 "} right-2 transition-all duration-150 `} >
        <FaArrowUp onClick={GoToTop} className="text-white font-bold text-[45px] bg-gradient-to-br from-[#ff6b6b] to-[#c77dff] rounded-full p-2 shadow-lg shadow-[#ff6b6b]/30  hover:scale-110 transition-all duration-300 cursor-pointer" />
    </section>
}
export default ScrollTop