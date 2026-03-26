import { useEffect, useRef, useState } from "react"

function ItemCard({ bag, index }) {
    const cardRef = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), (index % 3) * 120)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 }
        )
        if (cardRef.current) observer.observe(cardRef.current)
        return () => observer.disconnect()
    }, [index])

    function openWhatsApp(imageUrl) {
        const phone = "905342170870"
        const message = `Hello 👋 I want this product Image: ${imageUrl}`
        const Url = `https://wa.me/${phone}/?text=${encodeURIComponent(message)}`
        window.open(Url, "_blank", "noopener,noreferrer") //noopener,noreferrer use to protect the user when open the link
    }

    return (
        <div
            ref={cardRef}
            className="bg-white rounded-3xl overflow-hidden shadow-lg w-full transition-all duration-700"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(40px)",
            }}
        >
            <img className="cursor-pointer" src={`${import.meta.env.VITE_API_URL}${bag?.image[0]?.url}`} alt="ProductImage" onClick={() => openWhatsApp(`${import.meta.env.VITE_API_URL}${bag?.image[0]?.url}`)} />
            <div className="p-6" dir="rtl">
                <p className="my-1">اضغط على الصورة لإرسالها إلى واتساب</p>
                <h3 className="text-xl font-black text-gray-800 mb-2">{bag.name}</h3>

            </div>
        </div>
    )
}

export default ItemCard