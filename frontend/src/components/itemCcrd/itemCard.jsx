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
    console.log(`${import.meta.env.VITE_STRAPI_URL}${bag?.image[0]?.url}`);

    return (
        <div
            ref={cardRef}
            className="bg-white rounded-3xl overflow-hidden shadow-lg w-full transition-all duration-700"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0px)" : "translateY(40px)",
            }}
        >
            <img src={`${import.meta.env.VITE_API_URL}${bag?.image[0]?.url}`} alt="" />
            <div className="p-6" dir="rtl">
                <h3 className="text-xl font-black text-gray-800 mb-2">{bag.name}</h3>

            </div>
        </div>
    )
}

export default ItemCard